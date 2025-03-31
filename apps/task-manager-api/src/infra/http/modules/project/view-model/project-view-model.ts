import { Project } from 'src/modules/project/entities/project';

export class ProjectViewModel {
  static toHtpp({ id, name, description, createdAt }: Project) {
    return {
      id,
      name,
      description,
      createdAt,
    };
  }
}
