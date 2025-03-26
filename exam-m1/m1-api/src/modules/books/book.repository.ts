import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthorEntity, AuthorId } from '../database/entities/author.entity';
import { BookEntity, BookId } from '../database/entities/book.entity';
import { BookModel, CreateBookModel, UpdateBookModel } from './book.model';

@Injectable()
export class BookRepository {
  private readonly authorRepository =
    this.dataSource.getRepository(AuthorEntity);
  private readonly bookRepository = this.dataSource.getRepository(BookEntity);

  constructor(private readonly dataSource: DataSource) {}

  public async getBooks(): Promise<BookModel[]> {
    const books = await this.bookRepository.find({
      relations: { author: true },
    });

    return books;
  }

  public async getBookById(id: BookId): Promise<BookModel | null> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { author: true },
    });
    if (!book) {
      return null;
    }

    return book;
  }

  public async getBooksByAuthor(authorId: AuthorId): Promise<BookModel[]> {
    const books = await this.bookRepository.find({
      where: { authorId },
      relations: { author: true },
    });

    return books;
  }

  public async createBook(input: CreateBookModel): Promise<BookModel> {
    const author = await this.authorRepository.findOne({
      where: { id: input.authorId },
    });

    if (!author) {
      return null;
    }

    return this.bookRepository.save(this.bookRepository.create(input));
  }

  public async updateBook(
    id: BookId,
    input: UpdateBookModel,
  ): Promise<BookModel | null> {
    if (input.authorId) {
      const author = await this.authorRepository.findOne({
        where: { id: input.authorId },
      });

      if (!author) {
        return null;
      }
    }

    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      return null;
    }

    const newBook = { ...book, ...input };

    await this.bookRepository.update(id, newBook);

    return newBook;
  }

  public async deleteBook(id: BookId): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
