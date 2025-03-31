import { Injectable } from '@nestjs/common';
import { ProjectRepository } from 'src/modules/project/repositories/project-repository';
import { TaskRepository } from '../../repositories/task-repository';

interface GetTaskRequest {
  taskId: string;
}

@Injectable()
export class GetTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ taskId }: GetTaskRequest) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) throw new Error('task not found');

    return task;
  }
}
