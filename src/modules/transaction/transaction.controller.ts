import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiMessagedto } from 'src/common/dto/api-message.dto';
import { BaseController } from '../base.controller';
import { CreateTransactionDto, createTransactionDtoExample } from './dto/create-transaction.dto';
import { TransactionCriteriaDto } from './dto/transaction.criteria.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionController extends BaseController {
    constructor(private readonly transactionService: TransactionService) { super() }

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
    async findAll(
        @Query() criteria: TransactionCriteriaDto,
    ): Promise<ApiMessagedto<Transaction>> {
        const [content, total] = await this.transactionService.findAll(criteria);

        return this.makeResponse('Get list transaction success!', this.makeList(content, total, criteria));
    }

    @Get('/summary-amount')
    @ApiOperation({ summary: 'Get transactions with optional query parameters' })
    @ApiResponse({ status: 200, description: 'Returns transactions based on query parameters' })
    @ApiQuery({ name: 'start-date', required: false })
    @ApiQuery({ name: 'end-date', required: false })
    async getSummaryAmount(
        @Query("start-date") startDate?: string,
        @Query("end-date") endDate?: string,
    ): Promise<ApiMessagedto<any>> {
        const result = await this.transactionService.getSummaryAmount({ startDate, endDate });

        return this.makeResponse('Get list transaction success!', result);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ApiMessagedto<Transaction>> {
        return this.makeResponse('', await this.transactionService.findOne(Number(id)));
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
        return await this.transactionService.remove(Number(id));
    }
}