import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password', // Replace with your email password
        },
    });

    async sendEmail(to: string, subject: string, text: string) {
        await this.transporter.sendMail({
            from: 'test@payever.org',
            to,
            subject,
            text,
        });
    }
}