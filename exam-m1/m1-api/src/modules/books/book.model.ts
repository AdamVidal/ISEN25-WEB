import { AuthorId } from '../database/entities/author.entity';
import { BookId } from '../database/entities/book.entity';

export type BookAuthorModel = {
  firstName: string;
  lastName: string;
};

export type BookModel = {
  id: BookId;
  title: string;
  yearPublished: number;
  authorId: AuthorId;
  author: BookAuthorModel;
};

export type CreateBookModel = {
  title: string;
  yearPublished: number;
  authorId: AuthorId;
};

export type UpdateBookModel = Partial<CreateBookModel>;
