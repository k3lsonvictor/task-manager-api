import { Task } from "../entities/task";
import { TaskRepository } from "./task-repository";

export class TaskRepositoryInMemory implements TaskRepository {
  public tasks: Task[] = [];

  async create(task: Task): Promise<void> {
    await this.tasks.push(task);
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.tasks.find((task) => task.id === id);

    if (!task) return null;

    return task;
  }

  async findLastPosition(stageId: string): Promise<number> {
    const lastTask = await this.tasks
      .filter((task) => task.stageId === stageId)
      .reduce((max, task) => Math.max(max, Number(task.props.position)), 0);

    return lastTask;
  }

  async findAll(stageId: string): Promise<Task[]> {
    const tasks = await this.tasks.filter((task) => task.stageId === stageId);

    if (!tasks) return [];

    return tasks;
  }

  async findByStageId(stageId: string): Promise<Task[]> {
    const tasks = await this.tasks.filter((task) => task.stageId === stageId);
    return tasks;
  }

  async save(task: Task): Promise<void> {
    const taskIndex = await this.tasks.findIndex(
      (currentTask) => currentTask.id === task.id,
    );

    if (taskIndex >= 0) this.tasks[taskIndex] = task;
  }

  async saveMany(tasks: Task[]): Promise<void> {
    tasks.forEach(async (task) => {
      await this.save(task);
    });
  }

  async delete(id: string): Promise<void> {
    this.tasks = await this.tasks.filter((task) => task.id !== id);
  }
}
