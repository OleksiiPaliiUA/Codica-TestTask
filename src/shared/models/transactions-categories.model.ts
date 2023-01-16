import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Transaction } from './transaction.model';
import { Category } from './category.model';

@Table({ tableName: 'transactions_categories', timestamps: false })
export class TransactionCategory extends Model {
  @ForeignKey(() => Transaction)
  @Column({ type: DataType.UUID, field: 'transaction_id' })
  transactionId: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.UUID, field: 'category_id' })
  categoryId: string;
}
