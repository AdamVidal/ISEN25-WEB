import { FC } from "react";
import { AuthorModel } from "../models/AuthorModel";
import Link from 'next/link';
import "./AuthorListItem style.css";

type Props = {
  author: AuthorModel
}

export const AuthorListItem: FC<Props> = ({ author }) => {
  return <div className="author-list-item">
    <Link href={`/authors/${author.id}`}>{author.firstName} {author.lastName}</Link>, {author.numberOfBooks} livre{author.numberOfBooks > 1 ? 's' : ''}
  </div>
}