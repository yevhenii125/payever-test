import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        name: "thehempcoop.org",
        host: "server174.web-hosting.com",
        port: "465",
        secure: true, // use TLS
        auth: {
            user: "noreply@songsafety.org",
            pass: "!9&*$R?n=rfN",
        },
    });

    async sendEmail(to: string, subject: string, html: string) {
        const mailOptions = {
            from: {
                name: 'Song Safety',
                address: 'noreply@songsafety.org',
                host: "server174.web-hosting.com",
            },
            to,
            subject,
            html: `<!DOCTYPE html><html lang="en"><body><head></head>${html}</body></html>`
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error occurred while sending email:', error);
        }
    }
}