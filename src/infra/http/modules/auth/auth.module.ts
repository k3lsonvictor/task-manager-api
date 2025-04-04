import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/use-cases/create-user-use-case/create-user-use-case";
import { DatabaseModule } from "src/infra/database/database.module";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "src/modules/auth/strategies/local.strategy";
import { JwtStrategy } from "src/modules/auth/strategies/jwt.stategy";
import { ValidateUserUseCase } from "src/modules/auth/use-cases/validate-user-use-case/validate-user-use-case";
import { SignInUseCase } from "src/modules/auth/use-cases/sign-in-use-case/sign-in-use-case";
import { SignInDTOValidateMiddleware } from "./middleware/sign-in-dto-validate-middleware";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes("/signIn");
  }
}
