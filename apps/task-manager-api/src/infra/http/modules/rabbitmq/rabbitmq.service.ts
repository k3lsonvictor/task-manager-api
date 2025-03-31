import { Injectable } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq-producer.service';

@Injectable()
export class AppService {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  async defaultNestJS() {
    this.rabbitmqService.instance.emit('teste', {
      message: 'Aqui é uma nova mensagem',
    });
  }
}
