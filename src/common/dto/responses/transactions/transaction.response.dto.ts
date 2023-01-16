import { ApiProperty } from '@nestjs/swagger';
import { TransactionTypeEnum } from '@common/enums';

export class TransactionResponse {
  @ApiProperty({
    description: 'Transaction id',
    example: '0d89a63b-3b8a-4722-8442-9f651242fd88',
  })
  id: string;

  @ApiProperty({
    description: 'Bank id',
    example: '0d89a63b-3b8a-4722-8442-9f651242fd88',
  })
  bankId: string;

  @ApiProperty({ description: 'Amount of money', example: 500 })
  amount: number;

  @ApiProperty({
    description: 'Type of transaction',
    enum: TransactionTypeEnum,
  })
  type: TransactionTypeEnum;

  @ApiProperty({
    description: 'Updated at',
    example: '2023-01-13 14:47:20.374+02',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Created at',
    example: '2023-01-13 14:47:20.374+02',
  })
  createdAt: Date;
}
