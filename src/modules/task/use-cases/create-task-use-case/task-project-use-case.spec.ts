import { TaskRepositoryInMemory } from "../../repositories/task-repository-in-memory";
import { makeTask } from "../../factory/task-factory";
import { Task } from "../../entities/task";
import { CreateTaskUseCase } from "./task-project-use-case";

describe("Create Task Use Case", () => {
  let createTaskUseCase: CreateTaskUseCase;
  let taskRepository: TaskRepositoryInMemory;

  beforeEach(() => {
    taskRepository = new TaskRepositoryInMemory();
    createTaskUseCase = new CreateTaskUseCase(taskRepository);
  });

  it("Should create a task successfully", async () => {
    const taskData = makeTask({})

    const task = await createTaskUseCase.execute({title: taskData.title, description: taskData.description ?? "", stageId: taskData.stageId});

    expect(task).toBeInstanceOf(Task);
    expect(task.title).toBe(taskData.title);
    expect(task.description).toBe(taskData.description);
    expect(task.stageId).toBe(taskData.stageId);
    expect(task.position).toBe(1);

    // Verifica se a tarefa foi salva corretamente no repositório
    const storedTask = await taskRepository.findById(task.id);
    expect(storedTask).toEqual(task);
  });

  it("Should set the correct position based on existing tasks", async () => {
    const stageId = "stage-123";

    // Criando tarefas iniciais
    await taskRepository.create(makeTask({ stageId, position: 0 }));
    await taskRepository.create(makeTask({ stageId, position: 1 }));

    // Criando a nova tarefa
    const newTask = await createTaskUseCase.execute({
      title: "Next Task",
      stageId,
    });

    expect(newTask.position).toBe(2); // Nova posição deve ser 2
  });
});
