import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { BookService } from './book.service';
import { BookModel } from './book.model';
import { BookId } from '../database/entities/book.entity';
import { AuthorId } from '../database/entities/author.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  public async listBooks(): Promise<BookModel[]> {
    const books = await this.bookService.getBooks();

    return books;
  }

  @Get(':id')
  public async getBook(@Param('id') id: BookId): Promise<BookModel | null> {
    return this.bookService.getBookById(id);
  }

  @Get('/byAuthor/:id')
  public async getBooksByAuthor(@Param('id') id: AuthorId): Promise<BookModel[]> {
    const books = await this.bookService.getBooksByAuthor(id);

    return books;
  }

  @Post()
  public async createBook(@Body() input: CreateBookDto): Promise<BookModel> {
    return this.bookService.createBook(input);
  }

  @Patch(':id')
  public async updateBooks(
    @Param('id') id: BookId,
    @Body() input: UpdateBookDto,
  ) {
    return this.bookService.updateBook(id, input);
  }

  @Delete(':id')
  public async deleteBook(@Param('id') id: BookId): Promise<void> {
    await this.bookService.deleteBook(id);
  }
}
