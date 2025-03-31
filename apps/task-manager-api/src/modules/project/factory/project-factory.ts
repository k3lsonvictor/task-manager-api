import { Project } from '../entities/project';

type Override = Partial<Project>;

export const makeProject = ({ description, ...override }: Override) => {
  return new Project({
    id: 'id-teste',
    name: 'Default Project',
    description: description ?? undefined, // Garante que null seja tratado como undefined
    userId: 'default-user-id',
    ...override,
  });
};
