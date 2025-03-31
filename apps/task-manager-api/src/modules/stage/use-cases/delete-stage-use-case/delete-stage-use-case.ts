import { Injectable, NotFoundException } from '@nestjs/common';
import { StageRepository } from '../../repositories/stage-repository';

interface DeleteStageRequest {
  stageId: string;
}

@Injectable()
export class DeleteStagetUseCase {
  constructor(private readonly stageRepository: StageRepository) {}

  async execute({ stageId }: DeleteStageRequest) {
    const stage = await this.stageRepository.findById(stageId);

    if (!stage) {
      throw new NotFoundException('Stage not found');
    }

    await this.stageRepository.delete(stageId);
  }
}
