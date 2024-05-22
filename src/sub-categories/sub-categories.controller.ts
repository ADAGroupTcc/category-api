import { BadRequestException, Body, Controller, Header, Headers, Post } from '@nestjs/common';
import { SubCategoryDto } from './dto';
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
}
