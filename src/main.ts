// invoice-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InvoiceSeeder } from './invoice/invoice.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const invoiceSeeder = app.get(InvoiceSeeder);
  await invoiceSeeder.run(); // This will seed the database on startup

  app.setGlobalPrefix('api');
  await app.listen(3000);
  console.log('Invoice service is running on http://localhost:3000');
}
bootstrap();
