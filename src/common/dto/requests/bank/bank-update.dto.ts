import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BankUpdateDto {
  @ApiProperty({
    description: 'Bank id',
    example: 'aef9fdbc-b4b6-4beb-9326-9b4f1773b0ba',
  })
  @IsUUID(4)
  id: string;

  @ApiPropertyOptional({
    description: 'Bank name',
    example: 'Privat',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
