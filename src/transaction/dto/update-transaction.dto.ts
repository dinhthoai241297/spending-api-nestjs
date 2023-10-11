// update-transaction.dto.ts
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTransactionDto {
    @IsOptional() // Cho phép thiếu các trường
    @IsDate()
    @Transform(({ value }) => new Date(value)) // Biến đổi dữ liệu thành kiểu Date
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