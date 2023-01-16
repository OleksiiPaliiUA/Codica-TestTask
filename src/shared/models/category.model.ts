import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt,
  Unique,
} from 'sequelize-typescript';
import { Transaction } from './transaction.model';
import { TransactionCategory } from './transactions-categories.model';

@Table({ tableName: 'categories' })
export class Category extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Unique
  @Column
  name: string;

  @BelongsToMany(() => Transaction, () => TransactionCategory)
  transactions: Transaction[];

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
