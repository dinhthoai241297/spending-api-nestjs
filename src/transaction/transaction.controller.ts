import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto, createTransactionDtoExample } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new transaction' })
    @ApiResponse({ status: 201, description: 'The transaction has been successfully created.' })
    @ApiBody({
        type: CreateTransactionDto,
        examples: createTransactionDtoExample, // Use the imported example configuration
    })
    async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        return await this.transactionService.create(createTransactionDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get transactions with optional query parameters' })
    @ApiResponse({ status: 200, description: 'Returns transactions based on query parameters' })
    @ApiQuery({ name: 'startDate', required: false, type: String })
    @ApiQuery({ name: 'endDate', required: false, type: String })
    @ApiQuery({ name: 'money_movement', required: false, type: String })
    @ApiQuery({ name: 'tx_period', required: false, type: String })
    @ApiQuery({ name: 'tx_type', required: false, type: String })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'size', required: false, type: Number })
    async findAll(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('money_movement') moneyMovement?: string,
        @Query('tx_period') txPeriod?: string,
        @Query('tx_type') txType?: string,
        @Query('page') page = 0,
        @Query('size') size = 12,
    ): Promise<{ content: Transaction[], total: number }> {
        const [ content, total ] = await this.transactionService.findAll({
            startDate,
            endDate,
            moneyMovement,
            txPeriod,
            txType,
            page,
            size,
        });

        return { content, total };
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Transaction> {
        return await this.transactionService.findOne(Number(id));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a transaction' })
    @ApiResponse({ status: 200, description: 'The transaction has been successfully updated.' })
    @ApiBody({
        type: UpdateTransactionDto,
    })
    async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
        return await this.transactionService.update(Number(id), updateTransactionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.transactionService.remove(Number(id));
    }
}