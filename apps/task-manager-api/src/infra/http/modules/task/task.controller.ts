import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  Patch, 
  Delete 
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { EditTaskUseCase } from "src/modules/task/use-cases/edit-task-use-case/edit-task-use-case";
import { DeleteTaskUseCase } from "src/modules/task/use-cases/delete-task-use-case/delete-task-use-case";
import { GetTaskUseCase } from "src/modules/task/use-cases/get-task-use-case/get-task-use-case";
import { GetTasksUseCase } from "src/modules/task/use-cases/get-tasks-use-case/get-tasks-use-case";
import { CreateTaskBody } from "./dtos/task-task-body";
import { CreateTaskUseCase } from "src/modules/task/use-cases/create-task-use-case/task-project-use-case";
import { TaskViewModel } from "./view-model/task-view-model";
import { EditTaskBody } from "./dtos/edit-task-body";
import { TaskResponseDto } from "./dtos/task-response";

@ApiTags("Tasks") // Agrupa os endpoints no Swagger
@Controller("tasks")
export class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private editTaskUseCase: EditTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private getTaskUseCase: GetTaskUseCase,
    private getTasksUseCase: GetTasksUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Cria uma nova tarefa" })
  @ApiResponse({ status: 201, description: "Tarefa criada com sucesso", type: TaskResponseDto })
  async createTask(@Body() body: CreateTaskBody) {
    const { title, stageId, description } = body;

    const task = await this.createTaskUseCase.execute({
      title,
      stageId,
      description,
    });

    return TaskViewModel.toHtpp(task);
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtém uma tarefa pelo ID" })
  @ApiParam({ name: "id", description: "ID da tarefa", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ApiResponse({ status: 200, description: "Tarefa encontrada", type: TaskResponseDto })
  @ApiResponse({ status: 404, description: "Tarefa não encontrada" })
  async getTask(@Param("id") taskId: string) {
    const task = await this.getTaskUseCase.execute({ taskId });

    return TaskViewModel.toHtpp(task);
  }

  @Get("stage/:stageId")
  @ApiOperation({ summary: "Obtém todas as tarefas de um estágio" })
  @ApiParam({ name: "stageId", description: "ID do estágio", example: "456e7890-a12b-34c5-d678-9012ef345678" })
  @ApiResponse({ status: 200, description: "Lista de tarefas retornada com sucesso", type: [TaskResponseDto] })
  async getTasksOfStage(@Param("stageId") stageId: string) {
    const tasks = await this.getTasksUseCase.execute(stageId);
    return tasks.map(TaskViewModel.toHtpp);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Edita uma tarefa existente" })
  @ApiParam({ name: "id", description: "ID da tarefa", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ApiResponse({ status: 200, description: "Tarefa editada com sucesso", type: TaskResponseDto })
  @ApiResponse({ status: 404, description: "Tarefa não encontrada" })
  async editTask(
    @Param("id") taskId: string,
    @Body() body: EditTaskBody
  ) {
    const { title, stageId, description, dueDate, position } = body;

    const task = await this.editTaskUseCase.execute({
      stageId,
      taskId,
      title,
      description, 
      dueDate, 
      position
    });

    return TaskViewModel.toHtpp(task);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Deleta uma tarefa pelo ID" })
  @ApiParam({ name: "id", description: "ID da tarefa", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ApiResponse({ status: 200, description: "Tarefa deletada com sucesso" })
  @ApiResponse({ status: 404, description: "Tarefa não encontrada" })
  async deleteTask(@Param("id") taskId: string) {
    await this.deleteTaskUseCase.execute({ taskId });

    return { message: "Task deleted successfully" };
  }
}
