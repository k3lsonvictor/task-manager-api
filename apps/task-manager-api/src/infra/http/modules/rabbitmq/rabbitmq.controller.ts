import { Controller, Get } from '@nestjs/common';
import { AppService } from './rabbitmq.service';

@Controller()
export class RmqProcessController {
  constructor(private readonly appService: AppService) {}

  @Get('nest')
  async defaultNest() {
    return this.appService.defaultNestJS();
  }
}
