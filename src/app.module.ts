import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceSchema } from './invoice/invoice.schema';
import { InvoiceSeederService } from './seedDatabase.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/invoices'),
    ScheduleModule.forRoot(),
    InvoiceModule,
    MongooseModule.forFeature([{ name: 'Invoice', schema: InvoiceSchema }]),
  ],
  providers: [InvoiceSeederService],
})
export class AppModule { } 