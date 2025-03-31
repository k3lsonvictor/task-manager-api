import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../../repositories/task-repository';

interface DeleteTaskRequest {
  taskId: string;
}

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly TaskRepository: TaskRepository) {}

  async execute({ taskId }: DeleteTaskRequest) {
    const task = await this.TaskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.TaskRepository.delete(taskId);
  }
}
