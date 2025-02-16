import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ProjectRepository } from "src/modules/project/repositories/project-repository";
import { Project } from "src/modules/project/entities/project";
import { PrismaProjectMapper } from "../mappers/prisma-project-mapper";

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async create(project: Project): Promise<void> {
    const projectRaw = PrismaProjectMapper.toPrisma(project);

    await this.prisma.project.create({
      data: projectRaw,
    });
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) return null;

    return PrismaProjectMapper.toDomain(project);
  }

  async findAll(userId: string): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      where: { userId },
    });

    return projects.map(PrismaProjectMapper.toDomain);
  }

  async save(project: Project): Promise<void> {
    const projectRaw = PrismaProjectMapper.toPrisma(project);

    await this.prisma.project.update({
      where: { id: project.id },
      data: projectRaw,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }
}
