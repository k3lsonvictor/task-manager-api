import { Stage } from 'src/modules/stage/entities/stage';

export class StageViewModel {
  static toHtpp({ id, name, createdAt }: Stage) {
    return {
      id,
      name,
      createdAt,
    };
  }
}
