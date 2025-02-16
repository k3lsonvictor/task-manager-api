import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { Project } from "@prisma/client";
import { ProjectRepository } from "src/modules/project/repositories/project-repository";

interface EditProjectRequest {
  projectId: string;
  userId: string;
  name?: string;
  description?: string;
}

@Injectable()
export class EditProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute({ projectId, userId, name, description }: EditProjectRequest): Promise<Project> {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    if (project.userId !== userId) {
      throw new ForbiddenException("You do not have permission to edit this project");
    }

    // Atualiza apenas os campos fornecidos
    if (name) project.name = name;
    if (description !== undefined) project.description = description;

    await this.projectRepository.save(project);

    return project;
  }
}
