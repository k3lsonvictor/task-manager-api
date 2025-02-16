import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateProjectUseCase } from "src/modules/project/use-cases/create-project-use-case/create-project-use-case";
import { GetProjectUseCase } from "src/modules/project/use-cases/get-project-use-case/get-project-use-case";
import { GetProjectsUseCase } from "src/modules/project/use-cases/get-projects-use-case/get-projects-use-case";
import { ProjectController } from "./project.controller";
import { UserModule } from "../user/user.module";
import { DeleteProjectUseCase } from "src/modules/project/use-cases/delete-project-use-case/delete-project-use-case";
import { EditProjectUseCase } from "src/modules/project/use-cases/edit-project-use-case/edit-project-use-case.spec";

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [CreateProjectUseCase, GetProjectUseCase, GetProjectsUseCase, DeleteProjectUseCase, EditProjectUseCase]
})

export class ProjectModule {}