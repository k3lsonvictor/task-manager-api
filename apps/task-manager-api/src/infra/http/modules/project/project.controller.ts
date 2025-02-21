import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Request,
  HttpStatus,
} from "@nestjs/common";
import { CreateProjectUseCase } from "src/modules/project/use-cases/create-project-use-case/create-project-use-case";
import { DeleteProjectUseCase } from "src/modules/project/use-cases/delete-project-use-case/delete-project-use-case";
import { GetProjectUseCase } from "src/modules/project/use-cases/get-project-use-case/get-project-use-case";
import { GetProjectsUseCase } from "src/modules/project/use-cases/get-projects-use-case/get-projects-use-case";
import { AuthenticatedRequestModel } from "../auth/models/autheticated-request-model";
import { CreateProjectBody } from "./dtos/create-project-body";
import { EditProjectBody } from "./dtos/edit-project-body";
import { EditProjectUseCase } from "src/modules/project/use-cases/edit-project-use-case/edit-project-use-case";
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from "@nestjs/swagger";
import { ProjectResponseDto } from "./dtos/create-project-response";
import { ProjectViewModel } from "./view-model/project-view-model";

@ApiTags("Projects") // ✅ Organiza a rota no Swagger
@Controller("projects")
export class ProjectController {
  constructor(
    private createProjectUseCase: CreateProjectUseCase,
    private editProjectUseCase: EditProjectUseCase,
    private deleteProjectUseCase: DeleteProjectUseCase,
    private getProjectUseCase: GetProjectUseCase,
    private getProjectsUseCase: GetProjectsUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: "Cria um novo projeto" })
  @ApiBody({
    description: "Dados para a criação do projeto",
    type: CreateProjectBody,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Projeto criado com sucesso",
    type: ProjectResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Acesso Negado",
  })
  async createProject(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateProjectBody
  ) {
    const { name, description } = body;

    const project = await this.createProjectUseCase.execute({
      name,
      description,
      userId: request.user.id,
    });

    return ProjectViewModel.toHtpp(project);
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtém um projeto específico pelo ID" })
  @ApiParam({
    name: "id",
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "ID do projeto",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Retorna o projeto encontrado",
    type: ProjectResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Projeto não encontrado",
  })
  async getProject(
    @Request() request: AuthenticatedRequestModel,
    @Param("id") projectId: string
  ) {
    const project = await this.getProjectUseCase.execute({
      projectId,
      userId: request.user.id,
    });

    return ProjectViewModel.toHtpp(project);
  }

  @Get()
  @ApiOperation({ summary: "Lista todos os projetos do usuário autenticado" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Lista de projetos retornada com sucesso",
    type: [ProjectResponseDto], // ✅ Retorno esperado como array de projetos
  })
  async getManyProjects(@Request() request: AuthenticatedRequestModel) {
    const projects = await this.getProjectsUseCase.execute(request.user.id);
    return projects.map(ProjectViewModel.toHtpp);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Edita um projeto específico" })
  @ApiParam({
    name: "id",
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "ID do projeto",
  })
  @ApiBody({
    description: "Dados para edição do projeto",
    type: EditProjectBody,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Projeto editado com sucesso",
    type: ProjectResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Projeto não encontrado",
  })
  async editProject(
    @Request() request: AuthenticatedRequestModel,
    @Param("id") projectId: string,
    @Body() body: EditProjectBody
  ) {
    const { name, description } = body;

    const project = await this.editProjectUseCase.execute({
      projectId,
      userId: request.user.id,
      name,
      description,
    });

    return ProjectViewModel.toHtpp(project);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Deleta um projeto específico" })
  @ApiParam({
    name: "id",
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "ID do projeto",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Projeto deletado com sucesso",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Projeto não encontrado",
  })
  async deleteProject(
    @Request() request: AuthenticatedRequestModel,
    @Param("id") projectId: string
  ) {
    await this.deleteProjectUseCase.execute({
      projectId,
      userId: request.user.id,
    });

    return { message: "Projeto deletado com sucesso" };
  }
}
