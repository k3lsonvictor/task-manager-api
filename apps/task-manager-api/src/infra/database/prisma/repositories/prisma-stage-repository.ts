import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StageRepository } from 'src/modules/stage/repositories/stage-repository';
import { Stage } from 'src/modules/stage/entities/stage';
import { PrismaStageMapper } from '../mappers/prisma-stage-mapper';

@Injectable()
export class PrismaStageRepository implements StageRepository {
  constructor(private prisma: PrismaService) {}

  async create(stage: Stage): Promise<void> {
    const stageRaw = PrismaStageMapper.toPrisma(stage);

    await this.prisma.stage.create({
      data: stageRaw,
    });
  }

  async findById(id: string): Promise<Stage | null> {
    const stage = await this.prisma.stage.findUnique({
      where: { id },
    });

    if (!stage) return null;

    return PrismaStageMapper.toDomain(stage);
  }

  async findAll(projectId: string): Promise<Stage[]> {
    const stages = await this.prisma.stage.findMany({
      where: { projectId },
    });

    return stages.map(PrismaStageMapper.toDomain);
  }

  async save(stage: Stage): Promise<void> {
    const stageRaw = PrismaStageMapper.toPrisma(stage);

    await this.prisma.stage.update({
      where: { id: stage.id },
      data: stageRaw,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.stage.delete({
      where: { id },
    });
  }
}
