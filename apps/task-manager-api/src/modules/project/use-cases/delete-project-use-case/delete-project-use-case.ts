import { Injectable, NotFoundException } from "@nestjs/common";
import { ProjectRepository } from "../../repositories/project-repository";

interface DeleteProjectRequest {
  projectId: string;
  userId: string;
}

@Injectable()
export class DeleteProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute({projectId, userId}: DeleteProjectRequest) {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    if (project.userId !== userId) {
      throw new NotFoundException("You do not have permission to delete this project");
    }

    await this.projectRepository.delete(projectId);
  }
}
