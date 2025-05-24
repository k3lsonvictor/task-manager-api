import { Task as TaskRaw } from "@prisma/client";
import { Task } from "src/modules/task/entities/task";

export class PrismaTaskMapper {
  static toPrisma({
    createdAt,
    title,
    id,
    description,
    stageId,
    position,
    dueDate,
    tagId,
  }: Task): TaskRaw {
    return {
      createdAt,
      title,
      description,
      stageId,
      position,
      id,
      dueDate: dueDate ?? null, // Garante que seja compatível com o tipo esperado
      tagId: tagId ?? null, // Add tagId with a default value or map it appropriately
    };
  }

  static toDomain({
    createdAt,
    title,
    id,
    description,
    stageId,
    position,
    dueDate,
    tagId,
  }: TaskRaw): Task {
    return new Task(
      {
        createdAt,
        title,
        description,
        stageId,
        position,
        dueDate,
        tagId,
      },
      position,
      id,
    );
  }
}
