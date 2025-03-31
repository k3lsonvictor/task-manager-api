import { Task } from '../entities/task';

export abstract class TaskRepository {
  abstract create(task: Task): Promise<void>;
  abstract findById(id: string): Promise<Task | null>;
  abstract findAll(stageId: string): Promise<Task[]>;
  abstract findByStageId(stageId: string): Promise<Task[]>; // Novo método para buscar tasks por stageId
  abstract findLastPosition(stageId: string): Promise<number>;
  abstract save(task: Task): Promise<void>;
  abstract saveMany(tasks: Task[]): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
