import { TaskRepositoryInMemory } from "../../repositories/task-repository-in-memory";
import { makeTask } from "../../factory/task-factory";
import { DeleteTaskUseCase } from "./delete-task-use-case";
import { NotFoundException } from "@nestjs/common";

describe("Delete Task Use Case", () => {
  let deleteTaskUseCase: DeleteTaskUseCase;
  let taskRepository: TaskRepositoryInMemory;

  beforeEach(() => {
    taskRepository = new TaskRepositoryInMemory();
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  });

  it("Should delete a task successfully", async () => {
    const task = makeTask({});
    await taskRepository.create(task);

    await deleteTaskUseCase.execute({ taskId: task.id });

    // Garante que a tarefa foi removida
    const deletedTask = await taskRepository.findById(task.id);
    expect(deletedTask).toBeFalsy();
  });

  it("Should throw NotFoundException if task does not exist", async () => {
    await expect(
      deleteTaskUseCase.execute({ taskId: "non-existent-task" })
    ).rejects.toThrow(NotFoundException);
  });
});
