import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Bank } from '@shared';
import {
  BankCreateDto,
  BankResponse,
  BankUpdateDto,
  CoreApiResponse,
  CoreResponse,
  FindBankResponse,
} from '@common';
import { BankService } from './bank.service';

@ApiTags('Banks')
@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @ApiOperation({ summary: '[CreateBank]', description: 'Create new bank' })
  @ApiCreatedResponse({
    type: BankResponse,
    description: 'Successfully created',
  })
  @ApiConflictResponse({ type: CoreResponse, description: 'Already exist' })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'Validation error',
  })
  @Post()
  async create(@Body() body: BankCreateDto): Promise<Bank> {
    return this.bankService.create(body);
  }

  @ApiOperation({ summary: '[DeleteBank]', description: 'Delete bank' })
  @ApiOkResponse({
    type: CoreResponse,
    description: 'Successfully',
  })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'Id is not a UUID',
  })
  @ApiNotFoundResponse({ type: CoreResponse, description: 'Not found' })
  @ApiConflictResponse({ type: CoreResponse, description: 'Bank is not empty' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'aef9fdbc-b4b6-4beb-9326-9b4f1773b0ba',
    description: "Bank's id",
    required: true,
  })
  @Delete(':id')
  async destoy(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CoreApiResponse<null>> {
    return this.bankService.destroy(id);
  }

  @ApiOperation({ summary: '[GetAllBanks]', description: 'Get all banks' })
  @ApiOkResponse({
    type: BankResponse,
    isArray: true,
    description: 'Array of banks',
  })
  @Get()
  async findAll(): Promise<Bank[]> {
    return this.bankService.findAll();
  }

  @ApiOperation({ summary: '[GetBank]', description: 'Get bank' })
  @ApiOkResponse({ type: FindBankResponse, description: 'Successfully' })
  @ApiNotFoundResponse({ type: CoreResponse, description: 'Not found' })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'Id is not a UUID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'aef9fdbc-b4b6-4beb-9326-9b4f1773b0ba',
    description: "Bank's id",
    required: true,
  })
  @Get(':id')
  async find(@Param('id', ParseUUIDPipe) id: string): Promise<Bank> {
    return this.bankService.findOne(id);
  }

  @ApiOperation({ summary: '[UpdateBank]', description: 'Update bank' })
  @ApiOkResponse({ type: BankResponse, description: 'Successfully' })
  @ApiNotFoundResponse({ type: CoreResponse, description: 'Not found' })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'One of the arguments are of the wrong type',
  })
  @ApiConflictResponse({ type: CoreResponse, description: 'Already exist' })
  @Patch()
  async update(@Body() body: BankUpdateDto): Promise<Bank> {
    return this.bankService.update(body);
  }
}
