import { Injectable } from '@nestjs/common';
import { Bank, BankRepository } from '@shared';
import { BankCreateDto, BankUpdateDto, CoreApiResponse } from '@common';

@Injectable()
export class BankService {
  constructor(private readonly bankRepository: BankRepository) {}

  async create(data: BankCreateDto): Promise<Bank> {
    await this.bankRepository.throwIfExist({ where: { name: data.name } });
    return this.bankRepository.create(data);
  }

  async destroy(id: string): Promise<CoreApiResponse<null>> {
    return this.bankRepository.checkDestroy(id);
  }

  async findAll(): Promise<Bank[]> {
    return this.bankRepository.findAll();
  }

  async findOne(id: string): Promise<Bank> {
    return this.bankRepository.find(id);
  }

  async update(data: BankUpdateDto): Promise<Bank> {
    const { id, ...body } = data;
    return this.bankRepository.update(body, { where: { id } });
  }
}
