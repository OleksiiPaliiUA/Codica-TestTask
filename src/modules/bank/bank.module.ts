import { Module } from '@nestjs/common';
import { SharedModule } from '@shared';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';

@Module({
  imports: [SharedModule],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
