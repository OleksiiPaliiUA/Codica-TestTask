import { ApiPropertyOptional } from '@nestjs/swagger';
import { transformStringToInt } from '@common/helpers';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryDto {
  @ApiPropertyOptional({ description: 'Page number. Default: 0', example: 0 })
  @Transform((value) => transformStringToInt(value))
  @IsNumber()
  @IsOptional()
  page?: number = 0;

  @ApiPropertyOptional({
    description: 'Limit rows on one page. Default: 10',
    example: 10,
  })
  @Transform((value) => transformStringToInt(value))
  @IsNumber()
  @IsOptional()
  onPageLimit?: number = 10;
}
