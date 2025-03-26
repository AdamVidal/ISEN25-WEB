import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorModel } from './author.model';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import { AuthorId } from '../database/entities/author.entity';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  public async getAuthors(): Promise<AuthorModel[]> {
    return this.authorService.getAuthors();
  }
  
  @Get(':id')
  public async getAuthor(@Param('id') id: AuthorId): Promise<AuthorModel | null> {
    return this.authorService.getAuthorById(id);
  }
  

  @Post()
  public async createAuthor(
    @Body() input: CreateAuthorDto,
  ): Promise<AuthorModel> {
    return this.authorService.createAuthor(input);
  }
  
  @Patch(':id')
  public async updateAuthor(
    @Param('id') id: AuthorId,
    @Body() input: UpdateAuthorDto,
  ) {
    return this.authorService.updateAuthor(id, input);
  }
  
  @Delete(':id')
  public async deleteAuthor(@Param('id') id: AuthorId): Promise<void> {
    await this.authorService.deleteAuthor(id);
  }
}
