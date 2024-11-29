import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceSchema } from './invoice.schema';
import { InvoiceCron } from './invoice.cron';
import { RabbitMQService } from './invoice.rabbitmq';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

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
      uri: 'amqp://localhost:5672', // Update with your RabbitMQ URI
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceCron, RabbitMQService],
})
export class InvoiceModule {}
