import { ApiProperty } from '@nestjs/swagger';
import { QueryDto } from '../../requests';
import { TransactionResponse } from './transaction.response.dto';

class MetaResponse extends QueryDto {
  @ApiProperty({ description: 'Total count of all rows', example: 15 })
  totalCount: number;

  @ApiProperty({ description: 'Total count oon this page', example: 15 })
  onPageCount: number;

  @ApiProperty({ description: 'Amount of sliced rows', example: 10 })
  offset: number;
}

export class AllTransactionsResponse {
  @ApiProperty({
    type: TransactionResponse,
    isArray: true,
    description: 'Array of transactions',
  })
  data: TransactionResponse[];

  @ApiProperty({ type: MetaResponse, description: 'Meta info' })
  meta: MetaResponse;
}
