import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "src/modules/project/repositories/project-repository";

@Injectable()
export class GetProjectsUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(userId: string) {
    const projects = await this.projectRepository.findAll(userId);

    if(!projects) return [];

    return projects;
  }
}