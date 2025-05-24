import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { TagController } from "./tag.controller";
import { CreateTagUseCase } from "src/modules/tag/use-cases/create-tag-use-case/create-tag-use-case";
import { GetTagUseCase } from "src/modules/tag/use-cases/get-tag-use-case/get-stage-use-case";
import { GetTagsUseCase } from "src/modules/tag/use-cases/get-tags-use-case/get-tags-use-case";
import { DeleteTagtUseCase } from "src/modules/tag/use-cases/delete-tag-use-case/delete-tag-use-case";
import { EditTagUseCase } from "src/modules/tag/use-cases/edit-tag-use-case/edit-tag-use-case";

@Module({
  imports: [DatabaseModule],
  controllers: [TagController],
  providers: [
    CreateTagUseCase,
    GetTagUseCase,
    GetTagsUseCase,
    DeleteTagtUseCase,
    EditTagUseCase,
  ],
})
export class TagModule {}
