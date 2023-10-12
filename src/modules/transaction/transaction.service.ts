import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { paginationData } from 'src/utils';
import { Between, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionCriteriaDto } from './dto/transaction.criteria.dto';
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

    async findAll({
        start_date,
        end_date,
        money_movement,
        tx_period,
        tx_type,
        note,
        page,
        size,
    }: TransactionCriteriaDto): Promise<[Transaction[], number]> {
        let filterDate;

        if (start_date && end_date) {
            filterDate = Between(new Date(start_date), new Date(end_date));
        } else if (start_date) {
            filterDate = MoreThanOrEqual(new Date(start_date));
        } else if (end_date) {
            filterDate = LessThanOrEqual(new Date(end_date));
        }

        return await this.transactionRepository.findAndCount({
            where: {
                date: filterDate,
                money_movement,
                tx_period,
                tx_type,
                note: note ? Like(`%${note}%`) : undefined,
            },
            relations: [ 'category' ],
            ...paginationData(page, size)
        });
    }

    async findOne(id: number): Promise<Transaction> {
        return await this.transactionRepository.findOne({ where: { id }, relations: [ 'category' ] });
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
        const transaction = await this.transactionRepository.findOne({ where: { id } });

        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }

        const transactionUpdate = plainToInstance(Transaction, {
            ...transaction,
            ...updateTransactionDto,
        });

        return await this.transactionRepository.save(transactionUpdate);
    }

    async remove(id: number): Promise<void> {
        await this.transactionRepository.delete(id);
    }
}