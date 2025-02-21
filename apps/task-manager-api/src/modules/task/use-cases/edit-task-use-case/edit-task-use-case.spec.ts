import { TaskRepositoryInMemory } from "../../repositories/task-repository-in-memory";
import { makeTask } from "../../factory/task-factory";
import { EditTaskUseCase } from "./edit-task-use-case";
import { NotFoundException } from "@nestjs/common";

describe("Edit Task Use Case", () => {
  let editTaskUseCase: EditTaskUseCase;
  let taskRepository: TaskRepositoryInMemory;

  beforeEach(() => {
    taskRepository = new TaskRepositoryInMemory();
    editTaskUseCase = new EditTaskUseCase(taskRepository);
  });

  it("Should edit task title and description successfully", async () => {
    const task = makeTask({ title: "Old Title", description: "Old Description" });
    await taskRepository.create(task);

    const updatedTask = await editTaskUseCase.execute({
      taskId: task.id,
      stageId: task.stageId,
      title: "New Title",
      description: "New Description",
    });

    expect(updatedTask.title).toBe("New Title");
    expect(updatedTask.description).toBe("New Description");
  });

  it("Should throw NotFoundException if task does not exist", async () => {
    await expect(
      editTaskUseCase.execute({
        taskId: "non-existent-task",
        stageId: "some-stage",
        title: "Updated Title",
      })
    ).rejects.toThrow(NotFoundException);
  });

  it("Should move task to a new stage and update position", async () => {
    const oldStageId = "stage-1";
    const newStageId = "stage-2";

    const task = makeTask({ stageId: oldStageId, position: 1 });
    await taskRepository.create(task);

    const updatedTask = await editTaskUseCase.execute({
      taskId: task.id,
      stageId: newStageId,
    });

    expect(updatedTask.stageId).toBe(newStageId);
    expect(updatedTask.position).toBe(1); // Primeira posição no novo estágio
  });

  it("Should reorder tasks correctly when position is changed", async () => {
    const stageId = "stage-1";

    const task1 = makeTask({ stageId, position: 0 });
    const task2 = makeTask({ stageId, position: 1 });
    const task3 = makeTask({ stageId, position: 2 });

    await taskRepository.create(task1);
    await taskRepository.create(task2);
    await taskRepository.create(task3);

    // Movendo a terceira task para a posição 1
    const updatedTask = await editTaskUseCase.execute({
      taskId: task3.id,
      stageId,
      position: 1,
    });

    expect(updatedTask.position).toBe(1);

    // Verifica se as outras tarefas foram ajustadas corretamente
    const updatedTasks = await taskRepository.findByStageId(stageId);
    expect(updatedTasks.find(t => t.id === task1.id)?.position).toBe(0);
    expect(updatedTasks.find(t => t.id === task2.id)?.position).toBe(2);
    expect(updatedTasks.find(t => t.id === task3.id)?.position).toBe(1);
  });
});
