import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "../../repositories/task-repository";
import { Task } from "../../entities/task";

interface EditTaskRequest {
  taskId: string;
  stageId: string;
  title?: string;
  description?: string;
  position?: number;
  dueDate?: Date;
  tagId?: string | null;
}

@Injectable()
export class EditTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    taskId,
    stageId,
    title,
    description,
    position,
    dueDate,
    tagId,
  }: EditTaskRequest): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException("task not found");
    }

    // Recupera todas as tasks do mesmo stageId e ordena pela posição
    const tasksInStage = await this.taskRepository.findByStageId(stageId);
    tasksInStage.sort((a, b) => a.position - b.position);

    // Atualiza os campos fornecidos
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (tagId) {
      console.log("tagId", tagId);
      task.tagId = tagId;
    }

    // Se a task for movida para um novo estágio
    if (stageId !== task.stageId) {
      // Recupera as tasks do novo estágio e ajusta as posições
      const tasksInNewStage = await this.taskRepository.findByStageId(stageId);
      const newPosition = this.getNextAvailablePosition(tasksInNewStage);

      task.position = newPosition; // Atualiza a posição no novo estágio
      task.stageId = stageId; // Atualiza o estágio

      // Salva a task movida para o novo estágio
      await this.taskRepository.save(task);

      // Ajusta as posições das tasks no estágio anterior se necessário
      const updatedTasks = tasksInStage.filter((t) => t.id !== taskId);
      await this.taskRepository.saveMany(updatedTasks);
    } else if (position !== undefined && position !== task.position) {
      // Se a posição foi alterada dentro do mesmo estágio
      const updatedTasks = tasksInStage.filter((t) => t.id !== taskId);

      // Verifica se já existe uma task na nova posição e ajusta as posições subsequentes
      const taskAtPosition = updatedTasks.find((t) => t.position === position);
      if (taskAtPosition) {
        updatedTasks.forEach((t) => {
          if (t.position >= position) {
            t.position++; // Aumenta a posição das tasks subsequentes
          }
        });
      }

      task.position = position; // Atualiza a posição da task editada
      updatedTasks.push(task); // Adiciona a task editada de volta na lista
      updatedTasks.sort((a, b) => a.position - b.position); // Ordena as tasks

      // Salva todas as tasks com as novas posições
      await this.taskRepository.saveMany(updatedTasks);
    } else {
      await this.taskRepository.save(task); // Se não houve mudança na posição
    }

    return task;
  }

  private getNextAvailablePosition(tasksInStage: Task[]): number {
    const maxPosition =
      tasksInStage.length > 0
        ? Math.max(...tasksInStage.map((task) => task.position))
        : 0;
    return maxPosition + 1;
  }
}
