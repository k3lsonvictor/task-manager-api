import { Body, Controller, Get, Param, Post, Patch, Delete, Request } from "@nestjs/common";
import { EditTaskUseCase } from "src/modules/task/use-cases/edit-task-use-case/edit-task-use-case";
import { DeleteTaskUseCase } from "src/modules/task/use-cases/delete-task-use-case/delete-task-use-case";
import { GetTaskUseCase } from "src/modules/task/use-cases/get-task-use-case/get-task-use-case";
import { GetTasksUseCase } from "src/modules/task/use-cases/get-tasks-use-case/get-tasks-use-case";
import { CreateTaskBody } from "./dtos/task-stage-body";
import { CreateTaskUseCase } from "src/modules/task/use-cases/create-task-use-case/task-project-use-case";
import { TaskViewModel } from "./view-model/task-view-model";
import { EditTaskBody } from "./dtos/edit-stage-body";

@Controller("tasks")
export class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private editTaskUseCase: EditTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private getTaskUseCase: GetTaskUseCase,
    private getTasksUseCase: GetTasksUseCase,
  ) { }

  @Post()
  async createTask(
    @Body() body: CreateTaskBody
  ) {
    const { title, stageId, description } = body;

    const Task = await this.createTaskUseCase.execute({
      title,
      stageId,
      description,
    });

    return TaskViewModel.toHtpp(Task);
  }

  @Get(":id")
  async getTask(
    @Param("id") taskId: string,
  ) {
    const Task = await this.getTaskUseCase.execute({
      taskId
    });

    return TaskViewModel.toHtpp(Task);
  }

  @Get("/:StageId")
  async getTasksOfStage(@Param("StageId") StageId: string) {
    const task = await this.getTasksUseCase.execute(StageId);
    return task.map(TaskViewModel.toHtpp);
  }

  @Patch(":id")
  async editTask(
    @Param("id") taskId: string,
    @Body() body: EditTaskBody
  ) {
    const { title, stageId, description, dueDate, position } = body;

    const Task = await this.editTaskUseCase.execute({
      stageId,
      taskId,
      title,
      description, 
      dueDate, 
      position
    });

    return TaskViewModel.toHtpp(Task);
  }

  @Delete(":id")
  async deleteTask(
    @Param("id") taskId: string

  ) {
    await this.deleteTaskUseCase.execute({
      taskId,
    });

    return { message: "Task deleted successfully" };
  }
}
