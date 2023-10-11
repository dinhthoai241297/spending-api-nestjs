// update-transaction.dto.ts
import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionDto {
    @Transform(({ value }) => new Date(value))
    @IsDateString()
    date?: Date;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsNumber()
    category?: number;

    @IsOptional()
    @IsString()
    money_movement?: string;

    @IsOptional()
    @IsString()
    tx_period?: string;

    @IsOptional()
    @IsString()
    tx_type?: string;
}