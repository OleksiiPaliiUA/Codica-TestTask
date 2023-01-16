import { InjectModel } from '@nestjs/sequelize';
import { AbstractService, AllTransactionsResponse, QueryDto } from '@common';
import { Category, Transaction } from '@shared/models';
import { Repository } from 'sequelize-typescript';

export class TransactionRepository extends AbstractService<Transaction> {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: Repository<Transaction>,
  ) {
    super(transactionModel);
  }

  async findAllPaginate(query: QueryDto): Promise<AllTransactionsResponse> {
    const { onPageLimit, page } = query;
    const offset = page * onPageLimit;
    const include = [
      {
        model: Category,
        through: { attributes: [] },
        attributes: ['id', 'name'],
      },
    ];
    const result = await this.findAndCount({
      limit: onPageLimit,
      offset,
      include,
    });
    const totalCount = result.count;
    const data = result.rows.map((r) => {
      return r.get({ plain: true });
    });
    return {
      data,
      meta: {
        totalCount,
        onPageCount: data.length,
        page,
        onPageLimit,
        offset,
      },
    };
  }
}
