import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategories } from '../schemas/subcategory.schema';

@Injectable()
export class SubCategoriesService {
  constructor(@InjectModel(SubCategories.name) private readonly subCategoriesModel: Model<SubCategories>) { }

  async findAllWithoutFilters(): Promise<SubCategories[]> {
    return await this.subCategoriesModel.find().exec();
  }
}
