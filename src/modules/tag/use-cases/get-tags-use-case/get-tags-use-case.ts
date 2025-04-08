import { Injectable } from "@nestjs/common";
import { TaskRepository } from "src/modules/task/repositories/task-repository";
import { TagRepository } from "../../repositories/tag-repository";

@Injectable()
export class GetTagsUseCase {
  constructor(
    private tagRepository: TagRepository,
    private taskRepository: TaskRepository,
  ) {}

  async execute(projectId: string) {
    const tags = await this.tagRepository.findAll(projectId);

    if (!tags) return [];

    // const tagsWithBasicTasks = await Promise.all(
    //   tags.map(async (tag) => {
    //     const tasks = await this.taskRepository.findAll(tag._id);

    //     return {
    //       id: tag._id, // Ajusta o ID
    //       name: tag.props.name, // Ajusta o nome
    //       createdAt: tag.props.createdAt, // Ajusta a data
    //       projectId: tag.props.projectId, // Ajusta o projectId
    //       tasks: tasks,
    //     };
    //   }),
    // );

    return tags;
  }
}
