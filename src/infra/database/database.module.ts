import { Module } from "@nestjs/common";
import { UserRepository } from "src/modules/user/repositories/user-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { ProjectRepository } from "src/modules/project/repositories/project-repository";
import { PrismaProjectRepository } from "./prisma/repositories/prisma-project-repository";
import { StageRepository } from "src/modules/stage/repositories/stage-repository";
import { PrismaStageRepository } from "./prisma/repositories/prisma-stage-repository";
import { TaskRepository } from "src/modules/task/repositories/task-repository";
import { PrismaTaskRepository } from "./prisma/repositories/prisma-task-repository";
import { TagRepository } from "src/modules/tag/repositories/tag-repository";
import { PrismaTagRepository } from "./prisma/repositories/prisma-tag-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ProjectRepository,
      useClass: PrismaProjectRepository,
    },
    {
      provide: StageRepository,
      useClass: PrismaStageRepository,
    },
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository,
    },
    {
      provide: TagRepository,
      useClass: PrismaTagRepository,
    },
  ],
  exports: [
    UserRepository,
    ProjectRepository,
    StageRepository,
    TaskRepository,
    TagRepository,
  ],
})
export class DatabaseModule {}
