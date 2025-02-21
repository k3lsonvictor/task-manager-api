import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqProcessController } from './rabbitmq.controller';
import { RabbitmqService } from './rabbitmq-producer.service';
import { AppService } from './rabbitmq.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          // queue: "default",
          // queue: "fila_teste",
          // noAck: false,
          queueOptions: { durable: false },
        }
      }
    ])
  ],
  controllers: [RmqProcessController],
  providers: [RabbitmqService, AppService],
  exports: [RabbitmqService],
})
export class RmqProcessModule {}
