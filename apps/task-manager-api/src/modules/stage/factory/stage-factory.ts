import { Stage } from '../entities/stage';

type Override = Partial<Stage>;

export const makeStage = ({ ...override }: Override) => {
  return new Stage({
    id: 'id-teste',
    name: 'Default Project',
    projectId: 'default-user-id',
    ...override,
  });
};
