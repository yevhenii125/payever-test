import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoices')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) { }

    @Post()
    async create(@Body() invoiceDto) {
        return this.invoiceService.create(invoiceDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.invoiceService.findOne(id);
    }

    @Get()
    async findAll() {
        return this.invoiceService.findAll();
    }
}

