import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import {
  CoreResponse,
  CategoryUpdateDto,
  CategoryCreateDto,
  CategoryResponse,
  GetStatsDto,
  CoreApiResponse,
} from '@common';
import { Category } from '@shared';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: '[CreateCategory]',
    description: 'Create new category',
  })
  @ApiCreatedResponse({
    type: CategoryResponse,
    description: 'Successfully created',
  })
  @ApiConflictResponse({ type: CoreResponse, description: 'Already exist' })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'Validation error',
  })
  @Post()
  async create(@Body() body: CategoryCreateDto): Promise<Category> {
    return this.categoryService.create(body);
  }

  @ApiOperation({ summary: '[DeleteCategory]', description: 'Delete category' })
  @ApiOkResponse({
    type: CoreResponse,
    description: 'Successfully',
  })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'Id is not a UUID',
  })
  @ApiNotFoundResponse({ type: CoreResponse, description: 'Not found' })
  @ApiConflictResponse({
    type: CoreResponse,
    description: 'Category is not empty',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'aef9fdbc-b4b6-4beb-9326-9b4f1773b0ba',
    description: "Category's id",
    required: true,
  })
  @Delete(':id')
  async destoy(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CoreApiResponse<null>> {
    return this.categoryService.destroy(id);
  }

  @ApiOperation({
    summary: '[GetAllCategories]',
    description: 'Get all categories',
  })
  @ApiOkResponse({
    type: CategoryResponse,
    isArray: true,
    description: 'Array of categories',
  })
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: '[GetCategory]', description: 'Get category' })
  @ApiOkResponse({ type: CategoryResponse, description: 'Successfully' })
  @ApiNotFoundResponse({ type: CoreResponse, description: 'Not found' })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'Id is not a UUID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'aef9fdbc-b4b6-4beb-9326-9b4f1773b0ba',
    description: "Category's id",
    required: true,
  })
  @Get(':id')
  async find(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({ summary: '[UpdateCategory]', description: 'Update category' })
  @ApiOkResponse({ type: CategoryResponse, description: 'Successfully' })
  @ApiNotFoundResponse({ type: CoreResponse, description: 'Not found' })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'One of the arguments are of the wrong type',
  })
  @ApiConflictResponse({ type: CoreResponse, description: 'Already exist' })
  @Patch()
  async update(@Body() body: CategoryUpdateDto): Promise<Category> {
    return this.categoryService.update(body);
  }

  @ApiOperation({
    summary: '[GetStatistics]',
    description: 'Get transactions statistics',
  })
  @ApiOkResponse({
    schema: { example: { Food: '-2000', Salary: '+10000' } },
    description: 'Successfully',
  })
  @ApiBadRequestResponse({
    type: CoreResponse,
    description: 'One of the armugents are of the wrong type',
  })
  @ApiNotFoundResponse({ type: CoreResponse, description: 'Not found' })
  @Post('statistics')
  async getStats(@Body() body: GetStatsDto): Promise<object> {
    return this.categoryService.getStats(body);
  }
}
