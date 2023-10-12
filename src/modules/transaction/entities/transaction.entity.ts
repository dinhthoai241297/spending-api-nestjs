import { Category } from 'src/modules/category/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    date: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_date: Date;

    @Column({ type: 'float' })
    amount: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    note?: string;

    @ManyToOne(type => Category, { nullable: false })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column({ type: 'varchar', length: 255 })
    money_movement: string;

    @Column({ type: 'varchar', length: 255 })
    tx_period: string;

    @Column({ type: 'varchar', length: 255 })
    tx_type: string;
}
