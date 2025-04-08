import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from "@nestjs/common";
import { CreateTagUseCase } from "src/modules/tag/use-cases/create-tag-use-case/create-tag-use-case";
import { EditTagUseCase } from "src/modules/tag/use-cases/edit-tag-use-case/edit-tag-use-case";
import { DeleteTagtUseCase } from "src/modules/tag/use-cases/delete-tag-use-case/delete-tag-use-case";
import { GetTagUseCase } from "src/modules/tag/use-cases/get-tag-use-case/get-stage-use-case";
import { GetTagsUseCase } from "src/modules/tag/use-cases/get-tags-use-case/get-tags-use-case";
import { CreateTagBody } from "./dtos/tag-body";
import { TagViewModel } from "./view-model/task-view-model";
import { EditTagBody } from "./dtos/edit-tag-body";

@Controller("tags")
export class TagController {
  constructor(
    private createTagUseCase: CreateTagUseCase,
    private editTagUseCase: EditTagUseCase,
    private deleteTagUseCase: DeleteTagtUseCase,
    private getTagUseCase: GetTagUseCase,
    private getTagsUseCase: GetTagsUseCase,
  ) {}

  @Post()
  async createTag(@Body() body: CreateTagBody) {
    const { name, projectId, color } = body;

    const tag = await this.createTagUseCase.execute({
      name,
      projectId,
      color,
    });

    return TagViewModel.toHtpp(tag);
  }

  @Get(":id")
  async getTag(@Param("id") tagId: string) {
    const tag = await this.getTagUseCase.execute({
      tagId,
    });

    return TagViewModel.toHtpp(tag);
  }

  @Get("/:ProjectId")
  async getTagsOfProject(@Param("ProjectId") ProjectId: string) {
    const tag = await this.getTagsUseCase.execute(ProjectId);
    return tag.map((tag) => TagViewModel.toHtpp(tag));
  }

  @Patch(":id")
  async editTag(@Param("id") tagId: string, @Body() body: EditTagBody) {
    const { name, color } = body;

    const tag = await this.editTagUseCase.execute({
      tagId,
      name,
      color,
    });

    return TagViewModel.toHtpp(tag);
  }
  @Delete(":id")
  async deletetag(@Param("id") tagId: string) {
    await this.deleteTagUseCase.execute({
      tagId,
    });

    return { message: "tag deleted successfully" };
  }
}
