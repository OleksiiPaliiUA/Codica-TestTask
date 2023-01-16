import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';

export class BankResponse {
  @ApiProperty({
    description: 'Bank id',
    example: '0d89a63b-3b8a-4722-8442-9f651242fd88',
  })
  @IsUUID(4)
  id: string;

  @ApiProperty({ description: 'Bank name', example: 'MonoBanks' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Created at',
    example: '2023-01-13 14:47:20.374+02',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2022-01-13 14:47:20.374+02',
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ description: 'Bank balance', example: 120 })
  @IsNumber()
  balance: number;
}
