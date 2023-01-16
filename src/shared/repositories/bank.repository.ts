import { InjectModel } from '@nestjs/sequelize';
import { AbstractService, CoreApiResponse } from '@common';
import { Bank, Transaction, Category } from '@shared/models';
import { Repository } from 'sequelize-typescript';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BankRepository extends AbstractService<Bank> {
  constructor(@InjectModel(Bank) private readonly bankModel: Repository<Bank>) {
    super(bankModel);
  }

  async findWithTransactions(id: string): Promise<Bank> {
    const result = await this.throwIfNotExist({
      where: { id },
      include: { model: Transaction, attributes: ['type', 'amount'] },
    });
    return result.get({ plain: true });
  }

  async checkDestroy(id: string): Promise<CoreApiResponse<null>> {
    const bank = await this.findWithTransactions(id);
    if (bank.transactions.length !== 0)
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: 'Conflict' },
        HttpStatus.CONFLICT,
      );
    await this.destroy({ where: { id } });
    return CoreApiResponse.success({ message: 'Successfully' });
  }

  async find(id: string): Promise<Bank> {
    return this.throwIfNotExist({
      where: { id },
      include: [
        {
          model: Transaction,
          attributes: { exclude: ['bankId'] },
          include: [
            {
              model: Category,
              through: { attributes: [] },
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
  }
}
