import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategories, SubCategoriesSchema } from 'src/schemas';
import { SubCategoriesController } from './sub-categories.controller';
import { SubCategoriesService } from './sub-categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SubCategories.name, schema: SubCategoriesSchema }])
  ],
  providers: [SubCategoriesService, MongooseModule],
  controllers: [SubCategoriesController],
  exports: [SubCategoriesService]
})
export class SubCategoriesModule { }
