import { Stage as StageRaw } from "@prisma/client";
import { Stage } from "src/modules/stage/entities/stage";

export class PrismaStageMapper {
  static toPrisma({ createdAt, name, id, projectId }: Stage): StageRaw {
    return {
      createdAt,
      name,
      projectId,
      id,
    };
  }

  static toDomain({ createdAt, name, id, projectId }: StageRaw): Stage {
    return new Stage(
      {
        createdAt,
        name,
        projectId,
      },
      id,
    );
  }
}
