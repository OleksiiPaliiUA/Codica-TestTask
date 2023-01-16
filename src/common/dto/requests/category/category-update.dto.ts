import { IsUUID } from 'class-validator';
import { CategoryCreateDto } from './category-create.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryUpdateDto extends CategoryCreateDto {
  @ApiProperty({
    description: 'Category id',
    example: 'aef9fdbc-b4b6-4beb-9326-9b4f1773b0ba',
  })
  @IsUUID(4)
  id: string;
}
