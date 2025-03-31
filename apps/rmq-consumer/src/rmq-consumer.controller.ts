import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqConsumerService } from './rmq-consumer.service';

@Controller()
export class RmqConsumerController {
  constructor(private readonly rmqConsumerService: RmqConsumerService) {}

  @MessagePattern('teste')
  async defaultNest(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.rmqConsumerService.defaultNest(data, context);
  }
}
