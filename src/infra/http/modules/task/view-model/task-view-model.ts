import { Task } from "src/modules/task/entities/task";

export class TaskViewModel {
  static toHtpp({
    id,
    title,
    createdAt,
    dueDate,
    position,
    stageId,
    description,
    tagId,
  }: Task) {
    return {
      id,
      title,
      createdAt,
      dueDate,
      position,
      stageId,
      description,
      tagId,
    };
  }
}
