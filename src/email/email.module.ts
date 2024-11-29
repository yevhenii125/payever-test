import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailConsumer } from './email.consumer';

@Module({
    providers: [EmailService, EmailConsumer],
})
export class EmailModule { }
