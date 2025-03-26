import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from './author.model';
import { AuthorRepository } from './author.repository';
import { AuthorId } from '../database/entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.getAuthors();
  }
  
  public async getAuthorById(id: AuthorId): Promise<AuthorModel | null> {
    return this.authorRepository.getAuthorById(id);
  }

  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(input);
  }
  
  public async updateAuthor(
    id: AuthorId,
    input: UpdateAuthorModel,
  ): Promise<AuthorModel | null> {
    return this.authorRepository.updateAuthor(id, input);
  }
  
  public async deleteAuthor(id: AuthorId): Promise<void> {
    return this.authorRepository.deleteAuthor(id);
  }
}
