import { Project as ProjectRaw } from "@prisma/client"
import { Project } from "src/modules/project/entities/project";

export class PrismaProjectMapper {
  static toPrisma({ createdAt, name, id, description, userId }: Project): ProjectRaw {
    return {
      createdAt,
      name,
      description,
      userId,
      id,
    };
  }

  static toDomain({ createdAt, name, id, description, userId }: ProjectRaw): Project {
    return new Project({
      createdAt,
      name,
      description,
      userId
    }, id
    );
  }
}