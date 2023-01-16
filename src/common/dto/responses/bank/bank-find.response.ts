import { Transaction } from '@shared/models';
import { BankResponse } from './bank.response';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionResponse } from '../transactions';

export class FindBankResponse extends BankResponse {
  @ApiProperty({
    type: TransactionResponse,
    isArray: true,
    description: 'Array of transactions',
  })
  transactions: Transaction[];
}
