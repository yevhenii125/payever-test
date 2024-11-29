// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { InvoiceController } from './invoice.controller';
// import { InvoiceService } from './invoice.service';
// import { InvoiceCron } from './invoice.cron';
// import { RabbitMQService } from './invoice.rabbitmq';
// import { InvoiceSchema } from './invoice.schema';

// @Module({
//     imports: [
//         MongooseModule.forFeature([{ name: 'Invoice', schema: InvoiceSchema }]),
//     ],
//     controllers: [InvoiceController],
//     providers: [InvoiceService, InvoiceCron, RabbitMQService],
// })
// export class InvoiceModule { }


// invoice-service/src/invoice/invoice.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceCron } from './invoice.cron';
import { RabbitMQService } from './invoice.rabbitmq';
import { InvoiceSchema } from './invoice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invoice', schema: InvoiceSchema }]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'daily_sales_report',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672', 
    }),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceCron, RabbitMQService],
})
export class InvoiceModule {}
