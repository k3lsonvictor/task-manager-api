import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  HttpException,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { IncorrectValuesException } from './exceptions/incorretct-value-exception';
import { mapperClassValidationErrorToAppException } from './utils/mappers';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';

// Filtro global de exceções para capturar e logar erros inesperados
@Catch()
class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.error('🚨 Unhandled Exception:', exception);

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'Internal Server Error',
      });
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware de log para capturar todas as requisições
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`📥 Incoming request: ${req.method} ${req.url}`);
    res.on('finish', () => {
      console.log(`📤 Response: ${res.statusCode} ${req.method} ${req.url}`);
    });
    next();
  });

  // Adiciona o filtro global de exceções
  app.useGlobalFilters(new AllExceptionsFilter());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('Documentação da API do meu projeto NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Habilita CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://task-manager-plum-eight.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configura validação global com tratamento de erros personalizados
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors: ValidationError[]) {
        throw new IncorrectValuesException({
          fields: mapperClassValidationErrorToAppException(errors),
        });
      },
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();
