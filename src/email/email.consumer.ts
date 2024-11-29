import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { EmailService } from './email.service';

@Injectable()
export class EmailConsumer {
    constructor(private readonly emailService: EmailService) { }

    @RabbitSubscribe({
        exchange: '',
        routingKey: 'daily_sales_report',
        queue: 'email_queue',
    })
    async handleEmail(message: any) {
        const { date, totalSales, itemsSold } = message;
        const report = `Sales Report for ${date}:
                        Total Sales: ${totalSales}
                        Items Sold: ${JSON.stringify(itemsSold, null, 2)}`;

        await this.emailService.sendEmail('serhiikhomenko978@gmail.com', 'Daily Sales Report', report);
    }
}