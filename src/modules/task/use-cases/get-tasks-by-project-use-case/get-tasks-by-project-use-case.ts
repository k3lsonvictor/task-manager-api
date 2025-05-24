import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../../repositories/task-repository";

@Injectable()
export class GetTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(stageId: string) {
    const tasks = await this.taskRepository.findAll(stageId);

    if (!tasks) return [];

    return tasks;
  }
}
