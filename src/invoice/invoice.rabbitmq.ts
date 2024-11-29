import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQService {
    constructor(private readonly amqpConnection: AmqpConnection) { }

    async publish(queueName: string, message: any, report: { date: string; totalSales: number; itemsSold: {}; }) {
        // await this.amqpConnection.publish(queueName, message);
        await this.amqpConnection.publish('daily_sales_report', queueName, message);
    }
}
