/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/require-await */
import { Tag } from "../entities/tag";
import { TagRepository } from "./tag-repository";

export class tagRepositoryInMemory implements TagRepository {
  public tags: Tag[] = [];

  async create(tag: Tag): Promise<void> {
    this.tags.push(tag);
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await this.tags.find((tag) => tag.id === id);

    if (!tag) return null;

    return tag;
  }

  async findAll(projectId: string): Promise<Tag[]> {
    const tags = await this.tags.filter((tag) => tag.projectId === projectId);

    if (!tags) return [];

    return tags;
  }

  async save(tag: Tag) {
    const tagIndex = this.tags.findIndex(
      (currenttag) => currenttag.id === tag.id,
    );

    if (tagIndex >= 0) this.tags[tagIndex] = tag;
  }

  async delete(id: string) {
    this.tags = this.tags.filter((tag) => tag.id !== id);
  }
}
