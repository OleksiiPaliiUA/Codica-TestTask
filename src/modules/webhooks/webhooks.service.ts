import { TransactionTypeEnum } from '@common/enums';
import { Injectable } from '@nestjs/common';
import { BankRepository } from '@shared';

@Injectable()
export class WebhooksService {
  constructor(private readonly bankRepository: BankRepository) {}

  async updateBalanceWhenCreateTransaction(id: string): Promise<void> {
    const currentBank = await this.bankRepository.findWithTransactions(id);
    const values = { balance: 0 };
    for (const transaction of currentBank.transactions) {
      let amount = transaction.amount;
      if (transaction.type === TransactionTypeEnum.Consumable)
        amount = 0 - amount;
      values.balance += amount;
    }
    await this.bankRepository.update(values, { where: { id } });
  }
}
