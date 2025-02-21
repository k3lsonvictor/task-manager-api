import { Body, Controller, Get, Param, Post, Patch, Delete, Request, HttpStatus } from "@nestjs/common";
import { AuthenticatedRequestModel } from "../auth/models/autheticated-request-model";
import { CreateStagetUseCase } from "src/modules/stage/use-cases/create-stage-use-case/create-stage-use-case";
import { DeleteStagetUseCase } from "src/modules/stage/use-cases/delete-stage-use-case/delete-stage-use-case";
import { GetStageUseCase } from "src/modules/stage/use-cases/get-stage-use-case/get-stage-use-case";
import { EditstageUseCase } from "src/modules/stage/use-cases/edit-stage-use-case/edit-stage-use-case";
import { GetStagesUseCase } from "src/modules/stage/use-cases/get-stages-use-case/get-stages-use-case";
import { CreateStageBody } from "./dtos/create-stage-body";
import { EditStageBody } from "./dtos/edit-stage-body";
import { StageViewModel } from "./view-model/stage-view-model";
import { StagesViewModel } from "./view-model/stages-view-model";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StageResponseDto } from "./dtos/stage-response";

@ApiTags("Stages")
@Controller("stages")
export class StageController {
  constructor(
    private createStageUseCase: CreateStagetUseCase,
    private editStageUseCase: EditstageUseCase,
    private deleteStageUseCase: DeleteStagetUseCase,
    private getStageUseCase: GetStageUseCase,
    private getStagesUseCase: GetStagesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Cria uma nova etapa (Stage)" })
  @ApiBody({ description: "Dados para criação da etapa", type: CreateStageBody })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: "Etapa criada com sucesso",
    type: StageResponseDto 
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Dados inválidos" })
  async createStage(@Body() body: CreateStageBody) {
    const { name, projectId } = body;

    const stage = await this.createStageUseCase.execute({
      name,
      projectId,
    });

    return StageViewModel.toHtpp(stage);
  }

  @Get(":projectId")
  @ApiOperation({ summary: "Obtém todas as etapas de um projeto" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Lista de etapas do projeto",
    type: [StageResponseDto],
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Projeto não encontrado" })
  async getStages(@Param("projectId") projectId: string) {
    const stages = await this.getStagesUseCase.execute({ projectId });
    return stages.map(StagesViewModel.toHttp);
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtém uma etapa pelo ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Dados da etapa encontrada",
    type: StageResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Etapa não encontrada" })
  async getStage(@Param("id") stageId: string) {
    const stage = await this.getStageUseCase.execute({ stageId });
    return StageViewModel.toHtpp(stage);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Edita uma etapa existente" })
  @ApiBody({ description: "Dados para edição da etapa", type: EditStageBody })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Etapa editada com sucesso",
    type: StageResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Etapa não encontrada" })
  async editStage(@Param("id") stageId: string, @Body() body: EditStageBody) {
    const { name } = body;

    const stage = await this.editStageUseCase.execute({
      stageId,
      name,
    });

    return StageViewModel.toHtpp(stage);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Deleta uma etapa pelo ID" })
  @ApiResponse({ status: HttpStatus.OK, description: "Etapa deletada com sucesso" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Etapa não encontrada" })
  async deleteStage(@Param("id") stageId: string) {
    await this.deleteStageUseCase.execute({ stageId });

    return { message: "Stage deleted successfully" };
  }
}
