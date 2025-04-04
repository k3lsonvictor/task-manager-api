import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

export interface UserSchema {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export class User {
  public props: UserSchema;
  public _id: string;

  constructor(props: Replace<UserSchema, { createdAt?: Date }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt ? props.createdAt : new Date(),
    };
    this._id = id ? id : randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set email(email: string) {
    this.props.email = email;
  }

  set password(password: string) {
    this.props.password = password;
  }
}
