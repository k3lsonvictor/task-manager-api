import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { TaskRepository } from "../../repositories/task-repository";
import { Task } from "../../entities/task";

interface EditTaskRequest {
  taskId: string;
  stageId: string;
  title?: string;
  description?: string;
  position?: number;
  dueDate?: Date;
}

@Injectable()
export class EditTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ taskId, stageId, title, description, position, dueDate }: EditTaskRequest): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException("task not found");
    }

    if (task.stageId !== stageId) {
      throw new ForbiddenException("You do not have permission to edit this task");
    }

    // Atualiza apenas os campos fornecidos
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (position) task.position = position;
    if (dueDate) task.dueDate = dueDate;

    await this.taskRepository.save(task);

    return task;
  }
}
