import { Injectable } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { RabbitMQService } from './invoice.rabbitmq';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class InvoiceCron {
    constructor(
        private readonly invoiceService: InvoiceService,
        private readonly rabbitMQService: RabbitMQService,
    ) { }

    @Cron('0 12 * * *')
    async handleCron() {
        const invoices = await this.invoiceService.findAll();
        const today = new Date().toISOString().slice(0, 10);

        const dailySales = invoices.filter(
            (invoice) => invoice.date.toISOString().slice(0, 10) === today,
        );

        const totalSales = dailySales.reduce((sum, invoice) => sum + invoice.amount, 0);
        const itemsSold = dailySales.reduce((acc, invoice) => {
            invoice.items.forEach(({ sku, qt }) => {
                acc[sku] = (acc[sku] || 0) + qt;
            });
            return acc;
        }, {});

        const report = {
            date: today,
            totalSales,
            itemsSold,
        };

        await this.rabbitMQService.publish('daily_sales_report', 'email_queue', report);
    }
}
