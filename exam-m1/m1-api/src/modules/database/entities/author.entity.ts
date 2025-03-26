import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookEntity } from './book.entity'; // Import the BookEntity

export type AuthorId = string & { __brand: 'Author' };

@Entity('authors')
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthorId;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'biography', type: 'varchar' })
  biography: string;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[]; // Define the relationship
}
