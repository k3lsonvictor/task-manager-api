import { Tag } from "../entities/tag";

export abstract class TagRepository {
  abstract create(tag: Tag): Promise<void>;
  abstract findById(id: string): Promise<Tag | null>;
  abstract findAll(projectId: string): Promise<Tag[]>;
  abstract save(tag: Tag): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
