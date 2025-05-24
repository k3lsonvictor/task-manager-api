import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "../../repositories/project-repository";
import { Project } from "../../entities/project";

interface CreateProjectRequest {
  name: string;
  description?: string;
  userId: string;
}

@Injectable()
export class CreateProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({ name, description, userId }: CreateProjectRequest) {
    const project = new Project({
      name,
      description,
      userId,
    });

    await this.projectRepository.create(project);

    return project;
  }
}
