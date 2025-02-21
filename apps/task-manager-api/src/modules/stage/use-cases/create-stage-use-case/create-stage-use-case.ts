import { Injectable } from "@nestjs/common";
import { StageRepository } from "../../repositories/stage-repository";
import { Stage } from "../../entities/stage";

interface CreateStageRequest {
  name: string;
  description?: string;
  projectId: string;
}

@Injectable()
export class CreateStagetUseCase {
  constructor(
    private stageRepository: StageRepository,
  ) {}

  async execute({ name, projectId }: CreateStageRequest) {
    const stage = new Stage({
      name,
      projectId,
    })

    await this.stageRepository.create(stage);

    return stage;
  }
}