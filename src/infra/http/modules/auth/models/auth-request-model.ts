import { User } from "@prisma/client";

export class AuthRequestModel extends Request {
  user: User;
}
