import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthorEntity, AuthorId } from './author.entity';

export type BookId = string & { __brand: 'Book' };

@Entity('books')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: BookId;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'year_published', type: 'int' })
  yearPublished: number;

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: AuthorId;

  @ManyToOne(() => AuthorEntity, (author) => author.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: AuthorEntity;

  @Column({ name: 'price', type: 'float' })
  price: number;
}
