import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BankCreateDto {
  @ApiProperty({ description: 'Bank name', example: 'MonoBank' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
