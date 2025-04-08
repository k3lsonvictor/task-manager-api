import { Injectable, NotFoundException } from "@nestjs/common";
import { TagRepository } from "../../repositories/tag-repository";
import { Tag } from "../../entities/tag";

interface EditTagRequest {
  tagId: string;
  name?: string;
  color?: string;
}

@Injectable()
export class EditTagUseCase {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute({ tagId, name }: EditTagRequest): Promise<Tag> {
    const tag = await this.tagRepository.findById(tagId);

    if (!tag) {
      throw new NotFoundException("tag not found");
    }

    if (name) tag.name = name;

    await this.tagRepository.save(tag);

    return tag;
  }
}
