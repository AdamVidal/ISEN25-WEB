import { DataSource } from 'typeorm';
import { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from './author.model';
import { AuthorEntity } from '../database/entities/author.entity';
import { Injectable } from '@nestjs/common';
import { AuthorId } from '../database/entities/author.entity';

@Injectable()
export class AuthorRepository {
  private readonly authorRepository =
    this.dataSource.getRepository(AuthorEntity);

  constructor(private readonly dataSource: DataSource) {}

  public async getAuthors(): Promise<AuthorModel[]> {
    const authors = await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'book')
      .loadRelationCountAndMap('author.numberOfBooks', 'author.books')
      .getMany();

    return authors.map(author => ({
      ...author,
      numberOfBooks: author['numberOfBooks'] || 0,
    }));
  }
  
  public async getAuthorById(id: AuthorId): Promise<AuthorModel | null> {
    const author = await this.authorRepository.findOne({
      where: { id },
    });
    if (!author) {
      return null;
    }
  
    return author;
  }

  public async createAuthor(input: CreateAuthorModel) {
    return this.authorRepository.save(this.authorRepository.create(input));
  }
  
  public async updateAuthor(id: AuthorId, input: UpdateAuthorModel): Promise<AuthorModel | null> {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      return null;
    }

    Object.assign(author, input);
    return this.authorRepository.save(author);
  }
  
  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
