import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryCreateDto {
  @ApiProperty({ description: 'Category name', example: 'Food' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
