import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') public readonly instance: ClientRMQ,
  ) {}
}
