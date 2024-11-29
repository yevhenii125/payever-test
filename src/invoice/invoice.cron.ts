import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InvoiceService } from './invoice.service';
import { RabbitMQService } from './invoice.rabbitmq';

@Injectable()
export class InvoiceCron {
    constructor(
        private readonly invoiceService: InvoiceService,
        private readonly rabbitMQService: RabbitMQService,
    ) { }

    @Cron('0 12 * * *') // Every day at 12:00 PM
    async handleCron() {
        const invoices = await this.invoiceService.findAll();
        const today = new Date().toISOString().slice(0, 10);

        const dailySales = invoices.filter(
            (invoice) => invoice.date.toISOString().slice(0, 10) === today,
        );

        const totalSales = dailySales.reduce((sum, invoice) => sum + invoice.amount, 0);
        const itemsSold = {};

        dailySales.forEach((invoice) => {
            invoice.items.forEach(({ sku, qt }) => {
                itemsSold[sku] = (itemsSold[sku] || 0) + qt;
            });
        });

        const report = {
            date: today,
            totalSales,
            itemsSold,
        };

        await this.rabbitMQService.publish('daily_sales_report', report);
    }
}
