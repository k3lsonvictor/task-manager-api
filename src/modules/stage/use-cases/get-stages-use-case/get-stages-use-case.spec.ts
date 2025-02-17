import { GetStagesUseCase } from "./get-stages-use-case";
import { StageRepositoryInMemory } from "../../repositories/stage-repository-in-memory";
import { TaskRepositoryInMemory } from "src/modules/task/repositories/task-repository-in-memory";
import { makeStage } from "../../factory/stage-factory";
import { makeTask } from "src/modules/task/factory/task-factory";

describe("Get Stages Use Case", () => {
  let getStagesUseCase: GetStagesUseCase;
  let stageRepository: StageRepositoryInMemory;
  let taskRepository: TaskRepositoryInMemory;

  beforeEach(() => {
    stageRepository = new StageRepositoryInMemory();
    taskRepository = new TaskRepositoryInMemory();
    getStagesUseCase = new GetStagesUseCase(stageRepository, taskRepository);
  });

  it("Should return all stages of a project with their tasks", async () => {
    const projectId = "project-123";

    // Criando estágios no repositório
    const stage1 = makeStage({ projectId });
    const stage2 = makeStage({ projectId });

    await stageRepository.create(stage1);
    await stageRepository.create(stage2);

    // Criando tarefas associadas aos estágios
    const task1 = makeTask({ stageId: stage1.id });
    const task2 = makeTask({ stageId: stage2.id });

    await taskRepository.create(task1);
    await taskRepository.create(task2);

    // Executa o use case
    const stages = await getStagesUseCase.execute({ projectId });

    // Verifica se os estágios e tarefas foram retornados corretamente
    expect(stages).toHaveLength(2);

    expect(stages[0].id).toBe(stage1.id);
    expect(stages[0].tasks).toEqual([task1]);

    expect(stages[1].id).toBe(stage2.id);
    expect(stages[1].tasks).toEqual([task2]);
  });

  it("Should return an empty array if there are no stages in the project", async () => {
    const projectId = "empty-project";

    const stages = await getStagesUseCase.execute({ projectId });

    expect(stages).toEqual([]);
  });
});
