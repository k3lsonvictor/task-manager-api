import { Injectable, NotFoundException } from "@nestjs/common";
import { TagRepository } from "../../repositories/tag-repository";

interface DeleteTagRequest {
  tagId: string;
}

@Injectable()
export class DeleteTagtUseCase {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute({ tagId }: DeleteTagRequest) {
    const tag = await this.tagRepository.findById(tagId);

    if (!tag) {
      throw new NotFoundException("Stage not found");
    }

    await this.tagRepository.delete(tagId);
  }
}
