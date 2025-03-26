import { Injectable } from '@nestjs/common';
import { BookModel, CreateBookModel, UpdateBookModel } from './book.model';
import { BookRepository } from './book.repository';
import { BookId } from '../database/entities/book.entity';
import { AuthorId } from '../database/entities/author.entity';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  public async getBooks(): Promise<BookModel[]> {
    return this.bookRepository.getBooks();
  }

  public async getBookById(id: BookId): Promise<BookModel | null> {
    return this.bookRepository.getBookById(id);
  }

  public async getBooksByAuthor(id: AuthorId): Promise<BookModel[]> {
    return this.bookRepository.getBooksByAuthor(id);
  }

  public async createBook(input: CreateBookModel): Promise<BookModel> {
    return this.bookRepository.createBook(input);
  }

  public async updateBook(
    id: BookId,
    input: UpdateBookModel,
  ): Promise<BookModel | null> {
    return this.bookRepository.updateBook(id, input);
  }

  public async deleteBook(id: BookId): Promise<void> {
    return this.bookRepository.deleteBook(id);
  }
}
