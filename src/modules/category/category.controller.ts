import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiMessagedto } from 'src/common/dto/api-message.dto';
import { BaseController } from '../base.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto, createCategoryDtoExample } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
@ApiTags('categories')
export class CategoryController extends BaseController {
    constructor(private readonly categoryService: CategoryService) { super() }

    @Get()
    async findAll(): Promise<ApiMessagedto<Category>> {
        return this.makeResponse('Get categories success!', await this.categoryService.findAll());
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ApiMessagedto<Category>> {
        return this.makeResponse('Get category success!', await this.categoryService.findOne(+id));
    }

    @Post()
    @ApiBody({
        type: CreateCategoryDto,
        examples: createCategoryDtoExample, // Use the imported example configuration
    })
    create(@Body() categoryData: Partial<Category>): Promise<Category> {
        return this.categoryService.create(categoryData);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() categoryData: Partial<Category>): Promise<Category> {
        return this.categoryService.update(+id, categoryData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.categoryService.remove(+id);
    }
}