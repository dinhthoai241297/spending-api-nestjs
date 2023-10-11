import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    @IsNumber()
    parent_id?: number;

    @IsString()
    @IsNotEmpty()
    slug: string;
}

export const createCategoryDtoExample = {
    example1: {
        value: {
            name: 'Example Category 2',
            description: 'This is another example category',
            parent_id: 1,
            slug: 'example-category-2',
        },
        summary: 'A sample request body for creating a transaction.',
    },
};