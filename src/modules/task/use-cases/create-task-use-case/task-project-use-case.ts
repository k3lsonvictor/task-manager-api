import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../../repositories/task-repository";
import { Task } from "../../entities/task";

interface CreateTaskRequest {
  title: string;
  description?: string;
  stageId: string;
}

@Injectable()
export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ title, description, stageId }: CreateTaskRequest) {
    // Buscar a última posição da task dentro do stageId
    const lastTask = await this.taskRepository.findLastPosition(stageId);
    const lastPosition = lastTask ? lastTask : 0;

    // Criar a nova task com a posição ajustada
    const task = new Task(
      {
        title,
        description,
        stageId,
      },
      lastPosition // Passa a última posição encontrada
    );

    await this.taskRepository.create(task);

    return task;
  }
}
