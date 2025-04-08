import { Replace } from "src/utils/replace";
import { randomUUID } from "crypto";

export interface TagSchema {
  name: string;
  color: string;
  createdAt: Date;
  projectId: string;
}
export class Tag {
  public props: TagSchema;
  public _id: string;

  constructor(props: Replace<TagSchema, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  // Getter and Setter for name
  get name(): string {
    return this.props.name;
  }
  set name(value: string) {
    this.props.name = value;
  }
  // Getter and Setter for color
  get color(): string {
    return this.props.color;
  }
  set color(value: string) {
    this.props.color = value;
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
  // get taskId(): string {
  //   return this.props.taskId;
  // }
  // set taskId(value: string) {
  //   this.props.taskId = value;
  // }
  // Getter and Setter for projectId
  get projectId(): string {
    return this.props.projectId;
  }
  set projectId(value: string) {
    this.props.projectId = value;
  }
}
