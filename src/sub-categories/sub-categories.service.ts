import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategories } from '../schemas/subcategory.schema';
import { SubCategoryDto, SubCategoryPatchDto } from './dto';

@Injectable()
export class SubCategoriesService {
  constructor(@InjectModel(SubCategories.name) private readonly subCategoriesModel: Model<SubCategories>) { }

  async create(subCategory: SubCategoryDto): Promise<SubCategories> {
    const existingCategories: SubCategoryDto[] = await this.subCategoriesModel.find({ name: { $regex: `^${subCategory.name}$`, $options: 'i' } });
    if (existingCategories.length) {
      throw new BadRequestException('Sub category name is too similar to existing sub categories');
    }
    try {
      const createdSubCategory = new this.subCategoriesModel(subCategory);
      return await createdSubCategory.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(creatorId: string, name: string, next: number, limit: number): Promise<SubCategories[]> {
    let subCategories: SubCategories[];
    try {
      if (creatorId) {
        subCategories = await this.subCategoriesModel.find({ creatorId }).exec();
      }
      if (name) {
        subCategories = await this.subCategoriesModel.find({ name: { $regex: `^${name}$`, $options: 'i' } }).exec();
      }
      return subCategories ? subCategories : await this.subCategoriesModel.find().limit(limit).skip((next - 1) * limit).exec();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }


  async updateSubCategory(id: string, subCategory: SubCategoryPatchDto) {
    const existingCategories: SubCategoryPatchDto[] = await this.subCategoriesModel.find({ name: { $regex: `^${subCategory.name}$`, $options: 'i' } });
    if (existingCategories.length) {
      throw new BadRequestException('Sub categories name is too similar to existing categories');
    }

    if (subCategory.name) {
      subCategory.name = subCategory.name.toLowerCase();
    }

    var subCategoryUpdated: SubCategories

    try {
      subCategoryUpdated = await this.subCategoriesModel.findOneAndUpdate({ _id: id }, subCategory, { new: true })
    } catch (err) {
      if (err.name === 'CastError') {
        throw new BadRequestException('Invalid id')
      }
      throw new InternalServerErrorException(err.message)
    }
    if (!subCategoryUpdated)
      throw new NotFoundException('Category not found')
    subCategoryUpdated.updatedAt = new Date()
    return subCategoryUpdated
  }

  async findAllWithoutFilters(): Promise<SubCategories[]> {
    return await this.subCategoriesModel.find().exec();
  }
}
