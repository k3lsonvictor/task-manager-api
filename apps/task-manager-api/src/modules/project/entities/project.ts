import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

export interface ProjectSchema {
  name: string;
  description: string | null;
  userId: string;
  createdAt: Date;
}

export class Project {
  public _id: string;
  private props: ProjectSchema;

  constructor(
    props: Replace<
      ProjectSchema,
      { createdAt?: Date; description?: string | null }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      description: props.description ?? null,
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | null {
    return this.props.description;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set userId(userId: string) {
    this.props.userId = userId;
  }
}
