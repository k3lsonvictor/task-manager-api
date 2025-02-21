import { TaskRepositoryInMemory } from "../../repositories/task-repository-in-memory";
import { makeTask } from "../../factory/task-factory";
import { GetTasksUseCase } from "./get-tasks-use-case";

describe("Get Tasks Use Case", () => {
  let getTasksUseCase: GetTasksUseCase;
  let taskRepository: TaskRepositoryInMemory;

  beforeEach(() => {
    taskRepository = new TaskRepositoryInMemory();
    getTasksUseCase = new GetTasksUseCase(taskRepository);
  });

  it("Should return a list of tasks for a given stage", async () => {
    const stageId = "stage-1";
    const task1 = makeTask({ stageId });
    const task2 = makeTask({ stageId });

    await taskRepository.create(task1);
    await taskRepository.create(task2);

    const tasks = await getTasksUseCase.execute(stageId);

    expect(tasks).toHaveLength(2);
    expect(tasks[0].stageId).toBe(stageId);
    expect(tasks[1].stageId).toBe(stageId);
  });

  it("Should return an empty array if no tasks are found", async () => {
    const tasks = await getTasksUseCase.execute("non-existent-stage");

    expect(tasks).toEqual([]);
  });
});
