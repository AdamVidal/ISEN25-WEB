import { FC } from "react";
import { BookModel } from "../models/BookModel";
import Link from 'next/link';
import "./BookListItem style.css";

type Props = {
  book: BookModel
}

export const BookListItem: FC<Props> = ({ book }) => {
  return <div className="book-list-item">
    <Link href={`/books/${book.id}`}>{book.title}</Link> - <Link href={`/authors/${book.author.id}`}>{book.author.firstName} {book.author.lastName}</Link>, {book.yearPublished}
  </div>
}