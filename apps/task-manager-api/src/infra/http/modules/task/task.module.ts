import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { TaskController } from "./task.controller";
import { CreateTaskUseCase } from "src/modules/task/use-cases/create-task-use-case/task-project-use-case";
import { GetTaskUseCase } from "src/modules/task/use-cases/get-task-use-case/get-task-use-case";
import { DeleteTaskUseCase } from "src/modules/task/use-cases/delete-task-use-case/delete-task-use-case";
import { EditTaskUseCase } from "src/modules/task/use-cases/edit-task-use-case/edit-task-use-case";
import { GetTasksUseCase } from "src/modules/task/use-cases/get-tasks-use-case/get-tasks-use-case";

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [CreateTaskUseCase, GetTaskUseCase, GetTasksUseCase, DeleteTaskUseCase, EditTaskUseCase]
})

export class TaskModule {}