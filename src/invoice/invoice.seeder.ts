// invoice-service/src/invoice/invoice.seeder.ts
import { Injectable } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Injectable()
export class InvoiceSeeder {
    constructor(private readonly invoiceService: InvoiceService) { }

    async run() {
        const sampleInvoices = [
            {
                customer: 'John Doe',
                amount: 150.0,
                reference: 'INV001',
                date: new Date(),
                items: [
                    { sku: 'A123', qt: 2 },
                    { sku: 'B456', qt: 5 },
                ],
            },
            {
                customer: 'Jane Smith',
                amount: 320.0,
                reference: 'INV002',
                date: new Date(),
                items: [
                    { sku: 'C789', qt: 1 },
                    { sku: 'D012', qt: 3 },
                ],
            },
            {
                customer: 'Mike Johnson',
                amount: 450.0,
                reference: 'INV003',
                date: new Date(),
                items: [
                    { sku: 'E345', qt: 4 },
                    { sku: 'F678', qt: 2 },
                ],
            },
        ];

        for (const invoice of sampleInvoices) {
            await this.invoiceService.create(invoice);
        }
        console.log('Sample records have been added to the database.');
    }
}
