import { ApiProperty } from '@nestjs/swagger';
import { TransactionTypeEnum } from '@common/enums';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class TransactionCreateDto {
  @ApiProperty({
    description: 'Bank id',
    example: 'aef9fdbc-b4b6-4beb-9326-9b4f1773b0ba',
  })
  @IsUUID(4)
  bankId: string;

  @ApiProperty({ description: 'Amount', example: 700 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'Type of transaction',
    enum: TransactionTypeEnum,
  })
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;

  @ApiProperty({
    description: 'Array of categories ids',
    example: ['aef9fdbc-b4b6-4beb-9326-9b4f1773b0ba'],
  })
  @IsUUID(4, { each: true })
  categories: string[];
}
