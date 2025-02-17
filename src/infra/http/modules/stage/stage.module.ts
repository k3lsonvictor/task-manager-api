import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { StageController } from "./stage.controller";
import { CreateStagetUseCase } from "src/modules/stage/use-cases/create-stage-use-case/create-stage-use-case";
import { GetStageUseCase } from "src/modules/stage/use-cases/get-stage-use-case/get-stage-use-case";
import { DeleteStagetUseCase } from "src/modules/stage/use-cases/delete-stage-use-case/delete-stage-use-case";
import { EditstageUseCase } from "src/modules/stage/use-cases/edit-stage-use-case/edit-stage-use-case";
import { GetStagesUseCase } from "src/modules/stage/use-cases/get-stages-use-case/get-stages-use-case";

@Module({
  imports: [DatabaseModule],
  controllers: [StageController],
  providers: [CreateStagetUseCase, GetStageUseCase, GetStagesUseCase, DeleteStagetUseCase, EditstageUseCase]
})

export class StageModule {}