import { Injectable } from '@nestjs/common';
import { BankRepository, Transaction, TransactionRepository } from '@shared';
import {
  AllTransactionsResponse,
  CoreApiResponse,
  QueryDto,
  TransactionCreateDto,
} from '@common';
import { TransactionCategoryRepository } from '@shared';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly transactionCategoryRepository: TransactionCategoryRepository,
    private readonly sequelizeInstance: Sequelize,
    private readonly bankRepository: BankRepository,
  ) {}

  async create(data: TransactionCreateDto): Promise<Transaction> {
    const transaction = await this.sequelizeInstance.transaction();
    try {
      await this.bankRepository.throwIfNotExist({
        where: { id: data.bankId },
        transaction,
      });
      const createdTransaction = await this.transactionRepository.create(data, {
        transaction,
      });
      const { categories } = data;
      for (const categoryId of categories) {
        await this.transactionCategoryRepository.create(
          {
            transactionId: createdTransaction.id,
            categoryId,
          },
          { transaction },
        );
      }
      await transaction.commit();
      return createdTransaction;
    } catch (error) {
      await transaction.rollback();
    }
  }

  async destroy(id: string): Promise<CoreApiResponse<null>> {
    await this.transactionRepository.destroy({ where: { id } });
    return CoreApiResponse.success({ message: 'Sucessfully' });
  }

  async findAll(query: QueryDto): Promise<AllTransactionsResponse> {
    return this.transactionRepository.findAllPaginate(query);
  }
}
