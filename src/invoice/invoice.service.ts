import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './invoice.schema';

@Injectable()
export class InvoiceService {
  constructor(@InjectModel('Invoice') private invoiceModel: Model<Invoice>) {}

  async create(invoiceDto): Promise<Invoice> {
    const createdInvoice = new this.invoiceModel(invoiceDto);
    return createdInvoice.save();
  }

  async findOne(id: string): Promise<Invoice> {
    return this.invoiceModel.findById(id).exec();
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find().exec();
  }
}