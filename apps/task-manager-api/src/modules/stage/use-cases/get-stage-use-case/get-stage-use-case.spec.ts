import { GetStageUseCase } from './get-stage-use-case';
import { StageRepositoryInMemory } from '../../repositories/stage-repository-in-memory';
import { makeStage } from '../../factory/stage-factory';

describe('Get Stage Use Case', () => {
  let getStageUseCase: GetStageUseCase;
  let stageRepository: StageRepositoryInMemory;

  beforeEach(() => {
    stageRepository = new StageRepositoryInMemory();
    getStageUseCase = new GetStageUseCase(stageRepository);
  });

  it('Should return an existing stage', async () => {
    // Cria um estágio no repositório
    const stageData = makeStage({});
    await stageRepository.create(stageData);

    // Busca o estágio pelo ID
    const foundStage = await getStageUseCase.execute({ stageId: stageData.id });

    // Verifica se o estágio retornado é o correto
    expect(foundStage).toEqual(stageData);
  });

  it('Should throw an error if stage does not exist', async () => {
    await expect(
      getStageUseCase.execute({ stageId: 'non-existent-id' }),
    ).rejects.toThrow('Stage not found');
  });
});
