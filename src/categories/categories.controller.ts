import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto, CategoryPatchDto } from './dto';

@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  async createCategory(@Body() body: CategoryDto) {
    return this.categoriesService.createCategory(body);
  }

  @Get()
  async getCategories(@Query("name") name: string, @Query("limit") limit: number, @Query("next") next: number) {
    if (!limit) limit = 10;
    if (!next) next = 1;
    const categories = await this.categoriesService.getCategories(name, limit, next);
    return {
      categories,
      next: Number(next) + 1
    }
  }

  @Delete("/:id")
  @HttpCode(204)
  async deleteCategory(@Param("id") id: string) {
    return this.categoriesService.deleteCategory(id);
  }

  @Patch('/:id')
  async updateCategory(@Body() body: CategoryPatchDto, @Param("id") id: string) {
    if (body.name || body.subCategories || body.description || body.classification) {
      return this.categoriesService.updateCategory(id, body);
    } else {
      throw new BadRequestException('At least one field must be filled in to update the category');
    }
  }
}
