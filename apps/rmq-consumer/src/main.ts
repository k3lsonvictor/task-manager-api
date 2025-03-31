import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitmqConsumerService } from './rmq-consumer.module';

async function bootstrap() {
  console.log('🚀 Iniciando microserviço...');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RabbitmqConsumerService,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'default',
        noAck: false,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
  console.log('Microservice RabbitMQ is listening...');
}
bootstrap();
