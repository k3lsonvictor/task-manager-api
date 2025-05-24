import { Injectable } from "@nestjs/common";
import { TagRepository } from "../../repositories/tag-repository";

interface GetTagRequest {
  tagId: string;
}

@Injectable()
export class GetTagUseCase {
  constructor(private tagRepository: TagRepository) {}
  async execute({ tagId }: GetTagRequest) {
    const tag = await this.tagRepository.findById(tagId);

    if (!tag) throw new Error("tag not found");

    return tag;
  }
}
