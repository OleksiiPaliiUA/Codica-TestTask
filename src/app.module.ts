import { Module, MiddlewareConsumer } from '@nestjs/common';
import { RequestLoggerMiddleware } from '@common';
import { BankModule } from './modules/bank/bank.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { CategoryModule } from './modules/category/category.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';

const imports = [BankModule, TransactionModule, CategoryModule, WebhooksModule];

@Module({ imports })
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('');
  }
}
