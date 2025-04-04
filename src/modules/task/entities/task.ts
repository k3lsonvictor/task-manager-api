import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface TaskSchema {
  title: string;
  description?: string | null;
  dueDate?: Date | null;
  position: number;
  createdAt: Date;
  stageId: string;
}

export class Task {
  public props: TaskSchema;
  public _id: string;

  constructor(
    props: Replace<TaskSchema, { createdAt?: Date; position?: number }>,
    lastPosition: number = 0, // Última posição do stage
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      position: props.position ?? lastPosition + 1, // Define como última posição
    };
  }

  // Getter and Setter para title
  get title(): string {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
  }

  // Getter para createdAt (imutável)
  get createdAt(): Date {
    return this.props.createdAt;
  }

  // Getter para ID (imutável)
  get id(): string {
    return this._id;
  }

  // Getter e Setter para stageId
  get stageId(): string {
    return this.props.stageId;
  }

  set stageId(value: string) {
    this.props.stageId = value;
  }

  // Getter para dueDate
  get dueDate(): Date | null {
    return this.props.dueDate ?? null;
  }

  set dueDate(dueDate: Date) {
    this.props.dueDate = dueDate;
  }

  // Getter e Setter para position
  get position(): number {
    return this.props.position;
  }

  set position(value: number) {
    this.props.position = value;
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  set description(value: string) {
    this.props.description = value;
  }
}
