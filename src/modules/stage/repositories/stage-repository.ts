import { Stage } from "../entities/stage";

export abstract class StageRepository {
  abstract create(stage: Stage): Promise<void>;
  abstract findById(id: string): Promise<Stage | null>;
  abstract findAll(projectId: string): Promise<Stage[]>;
  abstract save(stage: Stage): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
