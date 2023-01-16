import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Delete,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Transaction } from '@shared';
import {
  CoreResponse,
  TransactionCreateDto,
  TransactionResponse,
  QueryDto,
  AllTransactionsResponse,
  CoreApiResponse,
  RepostWebhookInterceptor,
  WebhooksEnums,
} from '@common';
import { TransactionService } from './transaction.service';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transcationService: TransactionService) {}

  @ApiOperation({
    summary: '[CreateTransaction]',
    description: 'Create transaction',
  })
  @ApiCreatedResponse({
    type: TransactionResponse,
    description: 'Successfully',
  })
  @ApiNotFoundResponse({ type: CoreResponse, description: 'Wrong bankId' })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'One of the arguments are of the wrong type',
  })
  @UseInterceptors(RepostWebhookInterceptor(WebhooksEnums.UpdateBalance))
  @Post()
  async create(@Body() body: TransactionCreateDto): Promise<Transaction> {
    return this.transcationService.create(body);
  }

  @ApiOperation({
    summary: '[DeleteTransaction]',
    description: 'Delete transaction',
  })
  @ApiOkResponse({
    type: CoreResponse,
    description: 'Successfully',
  })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'Id is not a UUID',
  })
  @ApiNotFoundResponse({ type: CoreResponse, description: 'Not found' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'aef9fdbc-b4b6-4beb-9326-9b4f1773b0ba',
    description: 'Transaction id',
    required: true,
  })
  @UseInterceptors(RepostWebhookInterceptor(WebhooksEnums.UpdateBalance))
  @Delete(':id')
  async destroy(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CoreApiResponse<null>> {
    return this.transcationService.destroy(id);
  }

  @ApiOperation({
    summary: '[GetAllTransactions]',
    description: 'Get all transactions',
  })
  @ApiOkResponse({
    type: AllTransactionsResponse,
    description: 'Successfully',
  })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'One of the arguments are of the wrong types',
  })
  @Get()
  async findAll(@Query() query?: QueryDto): Promise<AllTransactionsResponse> {
    return this.transcationService.findAll(query);
  }
}
