import { Injectable } from "@nestjs/common";
import { StageRepository } from "../../repositories/stage-repository";
import { TaskRepository } from "src/modules/task/repositories/task-repository";

interface GetStagesRequest {
  projectId: string;
}

@Injectable()
export class GetStagesUseCase {
  constructor(
    private stageRepository: StageRepository,
    private taskRepository: TaskRepository,
  ) {}

  async execute({ projectId }: GetStagesRequest) {
    const stages = await this.stageRepository.findAll(projectId);

    const stagesWithBasicTasks = await Promise.all(
      stages.map(async (stage) => {
        const tasks = await this.taskRepository.findAll(stage._id);

        return {
          id: stage._id, // Ajusta o ID
          name: stage.props.name, // Ajusta o nome
          createdAt: stage.props.createdAt, // Ajusta a data
          projectId: stage.props.projectId, // Ajusta o projectId
          tasks: tasks,
        };
      }),
    );

    return stagesWithBasicTasks;
  }
}
