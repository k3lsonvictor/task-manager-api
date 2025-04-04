import { Project } from "../entities/project";

export abstract class ProjectRepository {
  abstract create(project: Project): Promise<void>;
  abstract findById(id: string): Promise<Project | null>;
  abstract findAll(userId: string): Promise<Project[]>;
  abstract save(project: Project): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
