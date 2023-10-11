import { MoneyMovement, TransactionPeriod, TransactionType } from 'src/constants';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

    @Column({ type: 'varchar', length: 255 })
    note: string;

    @Column({ type: 'int' })
    category: number;

    @Column('enum', { enum: MoneyMovement, default: MoneyMovement.OUT })
    money_movement: string;

    @Column('enum', { enum: TransactionPeriod, default: TransactionPeriod.DAY })
    tx_period: string;

    @Column('enum', { enum: TransactionType, default: TransactionType.ACTUAL })
    tx_type: string;
}
