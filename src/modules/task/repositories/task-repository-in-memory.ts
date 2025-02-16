import { Task } from "../entities/task";
import { TaskRepository } from "./task-repository";

export class taskRepositoryInMemory implements TaskRepository {
  public tasks: Task[] = []

  async create(task: Task): Promise<void>{
    this.tasks.push(task)
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.tasks.find(task => task.id === id);

    if(!task) return null;

    return task;
  }

  async findLastPosition(stageId: string): Promise<number> {
    const lastTask = this.tasks
      .filter(task => task.stageId === stageId)
      .reduce((max, task) => Math.max(max, Number(task.props.position)), 0);
  
    return lastTask;
  }

  async findAll(stageId: string): Promise<Task[]> {
    const tasks = await this.tasks.filter(task => task.stageId === stageId);

    if(!tasks) return [];

    return tasks;
  }

  async save(task: Task) {
    const taskIndex = this.tasks.findIndex(
      currenttask => currenttask.id === task.id
    );

    if (taskIndex >= 0) this.tasks[taskIndex] = task;
  }

  async delete(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}