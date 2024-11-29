// invoice-service/src/invoice/invoice.rabbitmq.ts
import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQService {
    constructor(private readonly amqpConnection: AmqpConnection) { }

    async publish(queueName: string, message: any) {
        await this.amqpConnection.publish('daily_sales_report', queueName, message);
    }
}
