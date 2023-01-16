import { InjectModel } from '@nestjs/sequelize';
import { AbstractService, CoreApiResponse } from '@common';
import { Category, Transaction } from '@shared/models';
import { Repository } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryRepository extends AbstractService<Category> {
  constructor(
    @InjectModel(Category) private readonly categoryModel: Repository<Category>,
  ) {
    super(categoryModel);
  }

  async find(id: string): Promise<Category> {
    return this.throwIfNotExist({
      where: { id },
      include: [
        {
          model: Transaction,
          through: { attributes: [] },
          attributes: ['id', 'type', 'amount'],
        },
      ],
    });
  }

  async checkDestroy(id: string): Promise<CoreApiResponse<null>> {
    const bank = await this.find(id);
    if (bank.transactions.length !== 0)
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: 'Conflict' },
        HttpStatus.CONFLICT,
      );
    await this.destroy({ where: { id } });
    return CoreApiResponse.success({ message: 'Successfully' });
  }

  async findBetweenDates(data: {
    id: string;
    fromPeriod: Date;
    toPeriod: Date;
  }): Promise<Category> {
    const { id, fromPeriod, toPeriod } = data;
    const result = await this.throwIfNotExist({
      where: { id },
      include: [
        {
          model: Transaction,
          where: {
            createdAt: {
              [Op.between]: [fromPeriod, toPeriod],
            },
          },
          through: { attributes: [] },
          attributes: ['type', 'amount'],
        },
      ],
    });
    return result.get({ plain: true });
  }
}
