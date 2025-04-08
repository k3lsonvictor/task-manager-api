import { Tag } from "src/modules/tag/entities/tag";

export class TagViewModel {
  static toHtpp({ id, name, createdAt, projectId, color }: Tag) {
    return {
      id,
      name,
      createdAt,
      projectId,
      color,
    };
  }
}
