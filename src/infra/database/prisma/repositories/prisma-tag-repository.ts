import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Tag } from "src/modules/tag/entities/tag";
import { TagRepository } from "src/modules/tag/repositories/tag-repository";
import { PrismaTagMapper } from "../mappers/prisma-tag-mapper";

@Injectable()
export class PrismaTagRepository implements TagRepository {
  constructor(private prisma: PrismaService) {}

  async create(tag: Tag): Promise<void> {
    const TagRaw = PrismaTagMapper.toPrisma(tag);

    await this.prisma.tag.create({
      data: TagRaw,
    });
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) return null;

    return PrismaTagMapper.toDomain(tag);
  }

  async findAll(projectId: string): Promise<Tag[]> {
    const Tags = await this.prisma.tag.findMany({
      where: { projectId },
    });

    return Tags.map((tag) => PrismaTagMapper.toDomain(tag));
  }

  async save(Tag: Tag): Promise<void> {
    const TagRaw = PrismaTagMapper.toPrisma(Tag);

    await this.prisma.tag.update({
      where: { id: Tag.id },
      data: TagRaw,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tag.delete({
      where: { id },
    });
  }
}
