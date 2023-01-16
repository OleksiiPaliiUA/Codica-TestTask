import { IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetStatsDto {
  @ApiProperty({
    description: 'Array of categories ids',
    example: ['aef9fdbc-b4b6-4beb-9326-9b4f1773b0ba'],
  })
  @IsUUID(4, { each: true })
  categoryIds: string[];

  @ApiProperty({ description: 'From period', example: '2023-01-14' })
  @IsDateString()
  fromPeriod: Date;

  @ApiProperty({ description: 'To period', example: '2023-01-15' })
  @IsDateString()
  toPeriod: Date;
}
