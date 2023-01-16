import { InjectModel } from '@nestjs/sequelize';
import { AbstractService } from '@common';
import { TransactionCategory } from '@shared/models';
import { Repository } from 'sequelize-typescript';

export class TransactionCategoryRepository extends AbstractService<TransactionCategory> {
  constructor(
    @InjectModel(TransactionCategory)
    private readonly transactionCategoryModel: Repository<TransactionCategory>,
  ) {
    super(transactionCategoryModel);
  }
}
