// invoice-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceSeeder } from './invoice/invoice.seeder';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/invoices'),
    ScheduleModule.forRoot(),
    InvoiceModule,
  ],
  providers: [InvoiceSeeder], // Register the seeder here
})
export class AppModule { }
