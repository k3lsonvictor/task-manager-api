import { Module } from '@nestjs/common';
import { RmqConsumerService } from './rmq-consumer.service';
import { RmqConsumerController } from './rmq-consumer.controller';

@Module({
  imports: [],
  controllers: [RmqConsumerController],
  providers: [RmqConsumerService],
  exports: [RmqConsumerService],
})
export class RabbitmqConsumerService {}
