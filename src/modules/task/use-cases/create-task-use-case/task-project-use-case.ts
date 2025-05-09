import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../../repositories/task-repository";
import { Task } from "../../entities/task";

interface CreateTaskRequest {
  title: string;
  description?: string;
  stageId: string;
  tagId?: string | null;
}

@Injectable()
export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) { }

  async execute({ title, description, stageId, tagId }: CreateTaskRequest) {
    // Buscar a maior posição existente no stageId
    const lastPosition =
      (await this.taskRepository.findLastPosition(stageId)) ?? -1;

    // Criar a nova task com a posição ajustada
    const task = new Task({
      title,
      description,
      stageId,
      position: lastPosition + 1, // 🔥 Garante que a nova posição seja a última
      tagId: tagId ?? null,
    });

    await this.taskRepository.create(task);

    return task;
  }
}
