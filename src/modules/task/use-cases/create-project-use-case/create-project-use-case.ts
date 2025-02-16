import { Injectable } from "@nestjs/common";
import { Project } from "src/modules/project/entities/project";
import { ProjectRepository } from "src/modules/project/repositories/project-repository";

interface CreateProjectRequest {
  name: string;
  description?: string;
  userId: string;
}

@Injectable()
export class CreateProjectUseCase {
  constructor(
    private projectRepository: ProjectRepository,
  ) {}

  async execute({name, description, userId}: CreateProjectRequest) {
    const project = new Project({
      name,
      description,
      userId
    })

    await this.projectRepository.create(project);

    return project;
  }
}