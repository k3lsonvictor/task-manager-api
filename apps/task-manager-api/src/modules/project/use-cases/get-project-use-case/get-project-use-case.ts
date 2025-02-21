import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "../../repositories/project-repository";

interface GetProjectRequest {
  projectId: string;
  userId: string;
}

@Injectable()
export class GetProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({projectId, userId}: GetProjectRequest) {
    const project = await this.projectRepository.findById(projectId);

    if (!project) throw new Error("Project not found");

    if (project.userId !== userId)
      throw new Error("No permition for recover the project")

    return project;
  }
}