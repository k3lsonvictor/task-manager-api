import { Body, Controller, Get, Param, Post, Patch, Delete, Request } from "@nestjs/common";
import { CreateProjectUseCase } from "src/modules/project/use-cases/create-project-use-case/create-project-use-case";
import { DeleteProjectUseCase } from "src/modules/project/use-cases/delete-project-use-case/delete-project-use-case";
import { GetProjectUseCase } from "src/modules/project/use-cases/get-project-use-case/get-project-use-case";
import { GetProjectsUseCase } from "src/modules/project/use-cases/get-projects-use-case/get-projects-use-case";
import { AuthenticatedRequestModel } from "../auth/models/autheticated-request-model";
import { CreateProjectBody } from "./dtos/create-project-body";
import { ProjectViewModel } from "./view-model/project-view-model";
import { EditProjectBody } from "./dtos/edit-project-body";
import { EditProjectUseCase } from "src/modules/project/use-cases/edit-project-use-case/edit-project-use-case";

@Controller("projects")
export class ProjectController {
  constructor(
    private createProjectUseCase: CreateProjectUseCase,
    private editProjectUseCase: EditProjectUseCase,
    private deleteProjectUseCase: DeleteProjectUseCase,
    private getProjectUseCase: GetProjectUseCase,
    private getProjectsUseCase: GetProjectsUseCase,
  ) {}

  @Post()
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
  async getProject(
    @Request() request: AuthenticatedRequestModel,
    @Param("id") projectId: string,
  ) {
    const project = await this.getProjectUseCase.execute({
      projectId,
      userId: request.user.id,
    });

    return ProjectViewModel.toHtpp(project);
  }

  @Get()
  async getManyProjects(@Request() request: AuthenticatedRequestModel) {
    const projects = await this.getProjectsUseCase.execute(request.user.id);
    return projects.map(ProjectViewModel.toHtpp);
  }

  @Patch(":id")
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
  async deleteProject(
    @Request() request: AuthenticatedRequestModel,
    @Param("id") projectId: string
  ) {
    await this.deleteProjectUseCase.execute({
      projectId,
      userId: request.user.id,
    });

    return { message: "Project deleted successfully" };
  }
}
