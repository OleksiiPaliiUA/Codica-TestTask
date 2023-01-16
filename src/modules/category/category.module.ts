import { Module } from '@nestjs/common';
import { SharedModule } from '@shared';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [SharedModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
