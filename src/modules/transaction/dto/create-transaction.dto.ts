import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MoneyMovement, TransactionPeriod, TransactionType } from 'src/constants';

export class CreateTransactionDto {
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    @IsDateString()
    date: Date;

    @IsString()
    note: string;

    @IsNumber()
    amount: number;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

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