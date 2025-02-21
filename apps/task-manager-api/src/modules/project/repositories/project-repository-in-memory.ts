import { Project } from "../entities/project";
import { ProjectRepository } from "./project-repository";

export class ProjectRepositoryInMemory implements ProjectRepository {
  public projects: Project[] = []

  async create(project: Project): Promise<void>{
    this.projects.push(project)
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.projects.find(project => project.id === id);

    if(!project) return null;

    return project;
  }

  async findAll(userId: string): Promise<Project[]> {
    const projects = await this.projects.filter(project => project.userId === userId);

    if(!projects) return [];

    return projects;
  }

  async save(project: Project) {
    const projectIndex = this.projects.findIndex(
      currentProject => currentProject.id === project.id
    );

    if (projectIndex >= 0) this.projects[projectIndex] = project;
  }

  async delete(id: string) {
    this.projects = this.projects.filter(project => project.id !== id);
  }
}