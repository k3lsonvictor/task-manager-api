import { CreateStagetUseCase } from './create-stage-use-case';
import { StageRepositoryInMemory } from '../../repositories/stage-repository-in-memory';
import { Stage } from '../../entities/stage';
import { makeStage } from '../../factory/stage-factory';

describe('Create Stage Use Case', () => {
  let createStageUseCase: CreateStagetUseCase;
  let stageRepository: StageRepositoryInMemory;

  beforeEach(() => {
    stageRepository = new StageRepositoryInMemory();
    createStageUseCase = new CreateStagetUseCase(stageRepository);
  });

  it('Should create a stage successfully', async () => {
    const stageData = makeStage({});

    const stage = await createStageUseCase.execute(stageData);

    expect(stage).toBeInstanceOf(Stage);
    expect(stage.name).toBe(stageData.name);
    expect(stage.projectId).toBe(stageData.projectId);

    // Verifica se o estágio foi salvo no repositório
    const storedStage = await stageRepository.findById(stage.id);
    expect(storedStage).toEqual(stage);
  });
});
