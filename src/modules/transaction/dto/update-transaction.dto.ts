// update-transaction.dto.ts
import { Transform } from 'class-transformer';
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/modules/category/entities/category.entity';

export class UpdateTransactionDto {
    @Transform(({ value }) => new Date(value))
    @IsDate()
    date?: Date;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsDefined()
    @Transform(({ value }) => new Category(value))
    category: Category;

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