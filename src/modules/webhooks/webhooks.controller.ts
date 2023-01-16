import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import {
  ApiTags,
  ApiParam,
  ApiSecurity,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiKeyEnum,
  AuthMethodsEnum,
  CoreResponse,
  WebhooksEnums,
} from '@common';

@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @ApiOperation({
    summary: '[UpdateBankBalance]',
    description:
      'Webhook for updating bank balance when new transaction created',
  })
  @ApiSecurity(ApiKeyEnum.HeaderName)
  @ApiParam({
    name: 'id',
    type: String,
    example: 'aef9fdbc-b4b6-4beb-9326-9b4f1773b0ba',
    description: 'Bank id',
    required: true,
  })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'Id is not a uuid',
  })
  @ApiUnauthorizedResponse({ type: CoreResponse, description: 'Unauthorized' })
  @UseGuards(AuthGuard(AuthMethodsEnum.ApiKey))
  @Post(`${WebhooksEnums.UpdateBalance}/:id`)
  async updateBalance(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.webhooksService.updateBalanceWhenCreateTransaction(id);
  }
}
