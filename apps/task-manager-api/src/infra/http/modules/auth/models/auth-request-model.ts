import { User } from "src/modules/user/entities/user";

export class AuthRequestModel extends Request {
  user: User;
}