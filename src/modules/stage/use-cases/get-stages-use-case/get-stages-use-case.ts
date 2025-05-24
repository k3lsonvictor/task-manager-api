import { Injectable } from "@nestjs/common";
import { StageRepository } from "../../repositories/stage-repository";
import { TaskRepository } from "src/modules/task/repositories/task-repository";
import { TagRepository } from "src/modules/tag/repositories/tag-repository";

interface GetStagesRequest {
  projectId: string;
}

@Injectable()
export class GetStagesUseCase {
  constructor(
    private stageRepository: StageRepository,
    private taskRepository: TaskRepository,
    private tagRepository: TagRepository,
  ) { }

  async execute({ projectId }: GetStagesRequest) {
    const stages = await this.stageRepository.findAll(projectId);

    const stagesWithBasicTasks = await Promise.all(
      stages.map(async (stage) => {
        const tasks = await this.taskRepository.findAll(stage._id);
        const tasksWithTags = await Promise.all(
          tasks.map(async (task) => {
            const tag = task.tagId
              ? await this.tagRepository.findById(task.tagId)
              : null;
            return {
              ...task,
              tag: tag
                ? { id: tag._id, name: tag.props.name, color: tag.props.color }
                : null,
            };
          }),
        );

        return {
          id: stage._id,
          name: stage.props.name,
          createdAt: stage.props.createdAt,
          projectId: stage.props.projectId,
          tasks: tasksWithTags
            .sort((a, b) => a.props.position - b.props.position) // Ordena pelo position
            .map((task) => ({
              id: task._id,
              title: task.props.title,
              description: task.props.description,
              position: task.props.position,
              dueDate: task.props.dueDate,
              tag: task.tag,
            })),
        };
      }),
    );

    return stagesWithBasicTasks;
  }
}
