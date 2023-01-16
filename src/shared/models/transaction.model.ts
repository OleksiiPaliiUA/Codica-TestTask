import { TransactionTypeEnum } from '@common';
import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Bank } from './bank.model';
import { Category } from './category.model';
import { TransactionCategory } from './transactions-categories.model';

@Table({ tableName: 'transactions' })
export class Transaction extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Bank)
  @Column({ type: DataType.UUID, field: 'bank_id' })
  bankId: string;

  @AllowNull(false)
  @Column
  amount: number;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(TransactionTypeEnum)))
  type: TransactionTypeEnum;

  @BelongsToMany(() => Category, () => TransactionCategory)
  categories: Category[];

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
