import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CoreResponse {
  @ApiProperty({ example: 200 })
  @IsNumber()
  code: number;

  @ApiProperty({ example: 'Message' })
  @IsString()
  message: string;

  @ApiProperty({ example: null })
  data: any;

  @ApiProperty({ example: 1673606281881 })
  timestamp: Date;
}
