import { ApiKeyEnum, EnvEnum } from '@common/enums';
import { HttpService } from '@nestjs/axios';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  mixin,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransactionRepository } from '@shared';
import { lastValueFrom, Observable, tap } from 'rxjs';

export function RepostWebhookInterceptor(hookName: string): any {
  class RepostWebhookMixin implements NestInterceptor {
    constructor(
      private readonly httpService: HttpService,
      @Inject(ConfigService) private readonly configService: ConfigService,
      @Inject(TransactionRepository)
      private readonly transactionRepository: TransactionRepository,
    ) {}

    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      let id: string;
      if (request.route.methods.delete) {
        const tmp = await this.transactionRepository.throwIfNotExist({
          where: { id: request.params.id },
        });
        id = tmp.bankId;
      } else id = request.body.bankId;
      const url = this.configService.get(EnvEnum.CORS_ORIGINS);
      return next.handle().pipe(
        tap(() => {
          lastValueFrom(
            this.httpService.post(url + `/webhooks/${hookName}/${id}`, null, {
              headers: {
                [ApiKeyEnum.HeaderName]: this.configService.get(
                  EnvEnum.API_KEY,
                ),
              },
            }),
          );
        }),
      );
    }
  }
  return mixin(RepostWebhookMixin);
}
