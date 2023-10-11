import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToInstance, instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';
import { paginationData } from 'src/utils';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
    ) { }

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const transaction = this.transactionRepository.create(createTransactionDto);
        return await this.transactionRepository.save(transaction);
    }

    async findAll(filters: {
        startDate?: string;
        endDate?: string;
        moneyMovement?: string;
        txPeriod?: string;
        txType?: string;
        page?: number;
        size?: number;
    }): Promise<[Transaction[], number]> {
        let filterDate;

        if (filters.startDate && filters.endDate) {
            filterDate = Between(new Date(filters.startDate), new Date(filters.endDate));
        } else if (filters.startDate) {
            filterDate = MoreThanOrEqual(new Date(filters.startDate));
        } else if (filters.endDate) {
            filterDate = LessThanOrEqual(new Date(filters.endDate));
        }

        return await this.transactionRepository.findAndCount({
            where: {
                date: filterDate,
                money_movement: filters.moneyMovement,
                tx_period: filters.txPeriod,
                tx_type: filters.txType,
            },
            ...paginationData(filters.page, filters.size)
        });
    }

    async findOne(id: number): Promise<Transaction> {
        return await this.transactionRepository.findOne({ where: { id } });
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
        const transaction = await this.transactionRepository.findOne({ where: { id } });


        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }

        const formInstance = plainToInstance(UpdateTransactionDto, updateTransactionDto);
        const updatedTransaction = plainToInstance(Transaction, formInstance);
        updatedTransaction.id = transaction.id;

        return await this.transactionRepository.save(updatedTransaction);
    }

    async remove(id: number): Promise<void> {
        await this.transactionRepository.delete(id);
    }
}