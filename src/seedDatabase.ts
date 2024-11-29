import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './invoice/invoice.schema';

@Injectable()
export class InvoiceSeederService implements OnModuleInit {
    constructor(@InjectModel('Invoice') private readonly invoiceModel: Model<Invoice>) { }

    async onModuleInit() {
        await this.seedDatabase();
    }

    private async seedDatabase() {
        const existingRecords = await this.invoiceModel.countDocuments();
        if (existingRecords > 0) {
            console.log('Database already seeded, skipping...');
            return;
        }

        const sampleInvoices = [
            {
                customer: 'John Doe',
                amount: 100.5,
                reference: 'INV-001',
                date: new Date(),
                items: [
                    { sku: 'ITEM-001', qt: 2 },
                    { sku: 'ITEM-002', qt: 1 },
                ],
            },
            {
                customer: 'Jane Smith',
                amount: 250.0,
                reference: 'INV-002',
                date: new Date(),
                items: [
                    { sku: 'ITEM-003', qt: 3 },
                    { sku: 'ITEM-004', qt: 1 },
                ],
            },
        ];

        await this.invoiceModel.insertMany(sampleInvoices);
        console.log('Sample invoices inserted into the database.');
    }
}
