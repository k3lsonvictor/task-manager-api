import { Injectable } from "@nestjs/common";
import { TagRepository } from "../../repositories/tag-repository";
import { Tag } from "../../entities/tag";

interface CreateTagRequest {
  name: string;
  projectId: string;
  // taskId: string;
  color: string;
}

@Injectable()
export class CreateTagUseCase {
  constructor(private tagRepository: TagRepository) {}

  async execute({ name, projectId, color }: CreateTagRequest) {
    const tag = new Tag({
      name,
      projectId,
      // taskId,
      color,
    });

    await this.tagRepository.create(tag);

    return tag;
  }
}
