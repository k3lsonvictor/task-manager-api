import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from "@nestjs/common";
import { CreateStagetUseCase } from "src/modules/stage/use-cases/create-stage-use-case/create-stage-use-case";
import { DeleteStagetUseCase } from "src/modules/stage/use-cases/delete-stage-use-case/delete-stage-use-case";
import { GetStageUseCase } from "src/modules/stage/use-cases/get-stage-use-case/get-stage-use-case";
// import { GetStagesUseCase } from "src/modules/stage/use-cases/get-stages-use-case/get-stages-use-case";
import { EditstageUseCase } from "src/modules/stage/use-cases/edit-stage-use-case/edit-stage-use-case";
import { CreateStageBody } from "./dtos/create-stage-body";
import { StageViewModel } from "./view-model/stage-view-model";
import { EditStageBody } from "./dtos/edit-stage-body";
import { GetStagesUseCase } from "src/modules/stage/use-cases/get-stages-use-case/get-stages-use-case";
import { StagesViewModel } from "./view-model/stages-view-model";

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
  async createStage(@Body() body: CreateStageBody) {
    const { name, projectId } = body;

    const Stage = await this.createStageUseCase.execute({
      name,
      projectId,
    });

    return StageViewModel.toHtpp(Stage);
  }

  @Get(":projectId")
  async getStages(@Param("projectId") projectId: string) {
    const stages = await this.getStagesUseCase.execute({
      projectId,
    });

    console.log(stages);

    return stages.map((stage) => StagesViewModel.toHttp(stage));
  }

  @Get(":id")
  async getStage(@Param("id") stageId: string) {
    const Stage = await this.getStageUseCase.execute({
      stageId,
    });

    return StageViewModel.toHtpp(Stage);
  }

  @Patch(":id")
  async editStage(@Param("id") stageId: string, @Body() body: EditStageBody) {
    const { name } = body;

    const Stage = await this.editStageUseCase.execute({
      stageId,
      name,
    });

    return StageViewModel.toHtpp(Stage);
  }

  @Delete(":id")
  async deleteStage(@Param("id") stageId: string) {
    await this.deleteStageUseCase.execute({
      stageId,
    });

    return { message: "Stage deleted successfully" };
  }
}
