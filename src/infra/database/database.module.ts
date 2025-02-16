import { Module } from "@nestjs/common";
import { UserRepository } from "src/modules/user/repositories/user-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { ProjectRepository } from "src/modules/project/repositories/project-repository";
import { PrismaProjectRepository } from "./prisma/repositories/prisma-project-repository";

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
  ],
  exports: [UserRepository, ProjectRepository]
})

export class DatabaseModule {}