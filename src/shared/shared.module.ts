import { Module } from '@nestjs/common';
import { Bank, Category, Transaction, TransactionCategory } from './models';
import {
  BankRepository,
  CategoryRepository,
  TransactionRepository,
} from './repositories';
import { DatabaseModule } from './database';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionCategoryRepository } from './repositories/transactions-categories.repository';

const models = [Bank, Transaction, Category, TransactionCategory];

const imports = [DatabaseModule, SequelizeModule.forFeature(models)];

const providers = [
  BankRepository,
  TransactionRepository,
  CategoryRepository,
  TransactionCategoryRepository,
];

@Module({
  imports,
  providers,
  exports: [...providers],
})
export class SharedModule {}
