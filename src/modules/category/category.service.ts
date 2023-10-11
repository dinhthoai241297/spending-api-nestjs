import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOne({ where: { id } });
    }

    async create(categoryData: Partial<Category>): Promise<Category> {
        const category = this.categoryRepository.create(categoryData);
        return this.categoryRepository.save(category);
    }

    async update(id: number, categoryData: Partial<Category>): Promise<Category> {
        await this.categoryRepository.update(id, categoryData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}
