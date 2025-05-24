import { Tag as TagRaw } from "@prisma/client";
import { Tag } from "src/modules/tag/entities/tag";

export class PrismaTagMapper {
  static toPrisma({ id, name, projectId, color, createdAt }: Tag): TagRaw {
    return {
      name,
      id,
      projectId,
      color,
      createdAt,
    };
  }

  static toDomain({ name, id, projectId, color }: TagRaw): Tag {
    if (
      !name ||
      typeof name !== "string" ||
      !id ||
      typeof id !== "string" ||
      !projectId ||
      typeof projectId !== "string" ||
      !color ||
      typeof color !== "string"
    ) {
      throw new Error("Invalid TagRaw object");
    }
    return new Tag(
      {
        name,
        projectId,
        color,
      },
      id,
    );
  }
}
