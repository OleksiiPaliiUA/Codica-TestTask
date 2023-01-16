import { Injectable } from '@nestjs/common';
import { Category, CategoryRepository } from '@shared';
import {
  CategoryCreateDto,
  CategoryUpdateDto,
  CoreApiResponse,
  GetStatsDto,
  TransactionTypeEnum,
} from '@common';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(data: CategoryCreateDto): Promise<Category> {
    await this.categoryRepository.throwIfExist({ where: { name: data.name } });
    return this.categoryRepository.create(data);
  }

  async destroy(id: string): Promise<CoreApiResponse<null>> {
    return this.categoryRepository.checkDestroy(id);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.find(id);
  }

  async update(data: CategoryUpdateDto): Promise<Category> {
    const { id, ...body } = data;
    return this.categoryRepository.update(body, { where: { id } });
  }

  async getStats(data: GetStatsDto): Promise<object> {
    const { categoryIds, ...body } = data;
    const result: object = {};
    for (const id of categoryIds) {
      const category = await this.categoryRepository.findBetweenDates({
        id,
        ...body,
      });
      let totalChange = 0;
      for (const transaction of category.transactions) {
        let { amount } = transaction;
        if (transaction.type === TransactionTypeEnum.Consumable)
          amount = 0 - amount;
        totalChange += amount;
      }
      result[category.name] =
        totalChange > 0 ? `+${totalChange}` : `${totalChange}`;
    }
    return result;
  }
}
