import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/use-cases/create-user-use-case/create-user-use-case";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/infra/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase]
})

export class UserModule {}