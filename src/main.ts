import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { IncorrectValuesException } from "./exceptions/incorretct-value-exception";
import { mapperClassValidationErrorToAppException } from "./utils/mappers";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors: ValidationError[]) {
        throw new IncorrectValuesException({
          fields: mapperClassValidationErrorToAppException(errors),
        });
      },
    }),
  );
  app.enableCors({
    origin: [
      "http://localhost:4200",
      "https://task-manager-plum-eight.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
