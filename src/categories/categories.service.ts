import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, SubCategories } from 'src/schemas';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { CategoryDto, CategoryPatchDto } from './dto';

@Injectable()
export class CategoriesService {

  constructor(
    private readonly subCategoriesService: SubCategoriesService,
    @InjectModel(Categories.name) private readonly categoriesModel: Model<CategoryDto>,
  ) { }

  async createCategory(category: CategoryDto) {
    if (category.subCategories && category.subCategories.length) {
      if (!await this.verifySubCategories(category)) {
        throw new BadRequestException('Invalid sub categories');
      }
    }
    const existingCategories: CategoryDto[] = await this.categoriesModel.find({ name: { $regex: `^${category.name}$`, $options: 'i' } });
    if (existingCategories.length) {
      throw new BadRequestException('Category name is too similar to existing categories');
    }

    try {
      if (category.name) {
        category.name = category.name.toLowerCase();
      }
      return await this.categoriesModel.create(category);
    } catch (err) {
      if (err.code === 11000)
        throw new BadRequestException(err.message)
      else
        throw new InternalServerErrorException(err.message)
    }
  }

  async getCategories(name: string, limit: number, next: number) {
    let categories: CategoryDto[];
    if (name) {
      categories = await this.categoriesModel.find({ name: { $regex: `^${name}$`, $options: 'i' } }).exec();
    }

    if (categories) {
      return categories
    }

    return await this.categoriesModel.find().limit(limit).skip((next - 1) * limit).exec();
  }
  
  async deleteCategory(id: string) {
    try {
      await this.categoriesModel.findByIdAndDelete(id).exec();
    } catch (err) {
      // Adicionar log de erro
    }
  }

  async updateCategory(id: string, category: CategoryPatchDto) {
    if (category.subCategories && category.subCategories.length) {
      if (!await this.verifySubCategories(category)) {
        throw new BadRequestException('Invalid sub categories');
      }
    }

    const existingCategories: CategoryDto[] = await this.categoriesModel.find({ name: { $regex: `^${category.name}$`, $options: 'i' } });
    if (existingCategories.length) {
      throw new BadRequestException('Category name is too similar to existing categories');
    }

    if (category.name) {
      category.name = category.name.toLowerCase();
    }
    const categoryUpdated: Categories = await this.categoriesModel.findOneAndUpdate({ _id: id }, category, { new: true })
    if (!categoryUpdated)
      throw new NotFoundException('Category not found')
    categoryUpdated.updatedAt = new Date()
    return categoryUpdated
  }

  async verifySubCategories(category: CategoryDto): Promise<boolean> {
    const subCategories: SubCategories[] = await this.subCategoriesService.findAllWithoutFilters();
    const subCategoriesIds: string[] = subCategories.map(subCategory => subCategory._id);
    const invalidSubCategories: string[] = category.subCategories.filter(subCategory => !subCategoriesIds.includes(subCategory));
    return invalidSubCategories && invalidSubCategories.length ? false : true;
  }
}
