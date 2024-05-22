import { BadRequestException, Body, Controller, Get, Header, Headers, Param, Patch, Post, Query } from '@nestjs/common';
import { SubCategoryDto, SubCategoryPatchDto } from './dto';
import { SubCategoriesService } from './sub-categories.service';

@Controller('v1/sub-categories')
export class SubCategoriesController {

  constructor(private readonly subCategoriesService: SubCategoriesService) { }

  @Post()
  async createSubCategory(@Body() body: SubCategoryDto, @Headers('user_id') userId: string) {
    if (!userId || userId === '') {
      throw new BadRequestException('Missing user_id header.');
    }
    body.creatorId = userId;
    return await this.subCategoriesService.create(body);
  }

  @Get()
  async findAllSubCategories(@Query('creator_id') creatorId: string, @Query('name') name: string, @Query('next') next: number, @Query('limit') limit: number) {
    if (!limit) limit = 10;
    if (!next) next = 1;
    const subCategories = await this.subCategoriesService.findAll(creatorId, name, next, limit);
    return {
      subCategories,
      next: Number(next) + 1
    }
  }

  @Patch(':id')
  async updateSubCategory(@Param('id') id: string, @Body() body: SubCategoryPatchDto) {
    return await this.subCategoriesService.updateSubCategory(id, body);
  }
}
