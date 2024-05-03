import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, CategoriesSchema } from 'src/schemas';
import { SubCategoriesModule } from 'src/sub-categories/sub-categories.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Categories.name, schema: CategoriesSchema }]),
    SubCategoriesModule
  ],
  providers: [CategoriesService, SubCategoriesModule, MongooseModule],
  controllers: [CategoriesController]
})
export class CategoriesModule { }
