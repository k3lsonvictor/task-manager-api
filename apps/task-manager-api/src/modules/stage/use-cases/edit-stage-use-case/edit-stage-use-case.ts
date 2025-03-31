import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { StageRepository } from '../../repositories/stage-repository';
import { Stage } from '../../entities/stage';

interface EditstageRequest {
  stageId: string;
  name?: string;
}

@Injectable()
export class EditstageUseCase {
  constructor(private readonly stageRepository: StageRepository) {}

  async execute({ stageId, name }: EditstageRequest): Promise<Stage> {
    const stage = await this.stageRepository.findById(stageId);

    if (!stage) {
      throw new NotFoundException('stage not found');
    }

    if (name) stage.name = name;

    await this.stageRepository.save(stage);

    return stage;
  }
}
