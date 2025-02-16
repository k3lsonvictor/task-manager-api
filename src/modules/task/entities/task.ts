import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface TaskSchema {
  title: string;
  description?: string | null;
  dueDate?: Date;
  createdAt: Date;
  stageId: string;
}

export class Task {
  public props: TaskSchema;
  public _id: string;

  constructor(props: Replace<TaskSchema, { createdAt?: Date}>, id?: string) {
      this._id = id ?? randomUUID();
      this.props = {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      };
    }
  
    // Getter and Setter for name
    get name(): string {
      return this.props.title;
    }
  
    set name(title: string) {
      this.props.title = title;
    }
  
    // Getter for createdAt (no setter as it's typically immutable)
    get createdAt(): Date {
      return this.props.createdAt;
    }
  
    // Getter for _id (no setter as it should be immutable)
    get id(): string {
      return this._id;
    }
  
    // Getter and Setter for projectId
    get stageId(): string {
      return this.props.stageId;
    }
  
    set stageId(value: string) {
      this.props.stageId = value;
    }

    get dueDate(): Date | null {
      return this.props.dueDate ?? null
    }
}