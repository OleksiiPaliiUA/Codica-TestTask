import { IsNumber, IsUUID } from 'class-validator';
import { Transaction } from 'sequelize';

export class BankIncomeDto {
  @IsUUID(4)
  id: string;

  @IsNumber()
  amount: number;

  transaction: Transaction;
}
