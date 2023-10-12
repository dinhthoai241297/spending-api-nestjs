import { Transform } from 'class-transformer';
import { IsDate, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { MoneyMovement, TransactionPeriod, TransactionType } from 'src/constants';
import { Category } from 'src/modules/category/entities/category.entity';

export class CreateTransactionDto {
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    date: Date;

    @IsOptional()
    @IsString()
    note: string;

    @IsNumber()
    amount: number;

    @Transform(({ value }) => new Category(value))
    @IsDefined()
    category: Category;

    @IsString()
    money_movement: string;

    @IsString()
    tx_period: string;

    @IsString()
    tx_type: string;
}

export const createTransactionDtoExample = {
    example1: {
        value: {
            date: '2023-10-10 22:10:00',
            note: 'Sample transaction',
            amount: 100,
            category: 1,
            money_movement: MoneyMovement.IN,
            tx_period: TransactionPeriod.DAY,
            tx_type: TransactionType.ACTUAL,
        },
        summary: 'A sample request body for creating a transaction.',
    },
    // Add more examples if needed
};