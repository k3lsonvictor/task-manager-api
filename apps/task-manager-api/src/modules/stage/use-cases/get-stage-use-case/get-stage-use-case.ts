import { Injectable } from '@nestjs/common';
import { StageRepository } from '../../repositories/stage-repository';

interface GetStageRequest {
  stageId: string;
}

@Injectable()
export class GetStageUseCase {
  constructor(private stageRepository: StageRepository) {}
  async execute({ stageId }: GetStageRequest) {
    const stage = await this.stageRepository.findById(stageId);

    if (!stage) throw new Error('Stage not found');

    return stage;
  }
}
