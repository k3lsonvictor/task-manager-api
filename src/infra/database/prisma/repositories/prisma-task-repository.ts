import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { TaskRepository } from "src/modules/task/repositories/task-repository";
import { Task } from "src/modules/task/entities/task";
import { PrismaTaskMapper } from "../mappers/prisma-task-mapper";

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private prisma: PrismaService) { }

  async create(task: Task): Promise<void> {
    const taskRaw = PrismaTaskMapper.toPrisma(task);

    await this.prisma.task.create({
      data: taskRaw,
    });
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) return null;

    return PrismaTaskMapper.toDomain(task);
  }

  async findAll(stageId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { stageId },
    });
    return tasks.map((task) => PrismaTaskMapper.toDomain(task));
  }

  async findByStageId(stageId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { stageId },
      orderBy: { position: "asc" }, // Ordena por posição (caso seja necessário)
    });

    return tasks.map((task) => PrismaTaskMapper.toDomain(task));
  }

  async findLastPosition(stageId: string): Promise<number> {
    const lastTask = await this.prisma.task.findFirst({
      where: { stageId },
      orderBy: { position: "desc" },
    });

    return lastTask ? lastTask.position : 0;
  }

  async save(task: Task): Promise<void> {
    const taskRaw = PrismaTaskMapper.toPrisma(task);

    console.log("taskRaw", taskRaw);

    await this.prisma.task.update({
      where: { id: task.id },
      data: {
        ...taskRaw,
        tagId: task.tagId ?? null,
      },
    });
  }

  async saveMany(tasks: Task[]): Promise<void> {
    const taskData = tasks.map((task) => PrismaTaskMapper.toPrisma(task));

    // Atualiza cada task individualmente
    for (const task of taskData) {
      await this.prisma.task.update({
        where: { id: task.id }, // Identifica a task pela ID
        data: task, // Atualiza com os novos dados
      });
    }
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
