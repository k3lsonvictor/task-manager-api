import { Stage } from '../entities/stage';
import { StageRepository } from './stage-repository';

export class StageRepositoryInMemory implements StageRepository {
  public stages: Stage[] = [];

  async create(stage: Stage): Promise<void> {
    this.stages.push(stage);
  }

  async findById(id: string): Promise<Stage | null> {
    const stage = await this.stages.find((stage) => stage.id === id);

    if (!stage) return null;

    return stage;
  }

  async findAll(projectId: string): Promise<Stage[]> {
    const stages = await this.stages.filter(
      (stage) => stage.projectId === projectId,
    );

    if (!stages) return [];

    return stages;
  }

  async save(stage: Stage) {
    const stageIndex = this.stages.findIndex(
      (currentstage) => currentstage.id === stage.id,
    );

    if (stageIndex >= 0) this.stages[stageIndex] = stage;
  }

  async delete(id: string) {
    this.stages = this.stages.filter((stage) => stage.id !== id);
  }
}
