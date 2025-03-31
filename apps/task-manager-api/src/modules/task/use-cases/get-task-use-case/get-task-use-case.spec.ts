import { TaskRepositoryInMemory } from '../../repositories/task-repository-in-memory';
import { makeTask } from '../../factory/task-factory';
import { GetTaskUseCase } from './get-task-use-case';

describe('Get Task Use Case', () => {
  let getTaskUseCase: GetTaskUseCase;
  let taskRepository: TaskRepositoryInMemory;

  beforeEach(() => {
    taskRepository = new TaskRepositoryInMemory();
    getTaskUseCase = new GetTaskUseCase(taskRepository);
  });

  it('Should return a task successfully', async () => {
    const task = makeTask({});
    await taskRepository.create(task);

    const foundTask = await getTaskUseCase.execute({ taskId: task.id });

    expect(foundTask).toBeDefined();
    expect(foundTask.id).toBe(task.id);
    expect(foundTask.title).toBe(task.title);
  });

  it('Should throw an error if task does not exist', async () => {
    await expect(
      getTaskUseCase.execute({ taskId: 'non-existent-task' }),
    ).rejects.toThrow('task not found');
  });
});
