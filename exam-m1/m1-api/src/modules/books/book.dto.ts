import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { AuthorId } from '../database/entities/author.entity';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsInt()
  @Min(1500)
  @Max(2024)
  yearPublished: number;

  @IsUUID()
  authorId: AuthorId;
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsInt()
  @Min(1500)
  @Max(2024)
  @IsOptional()
  yearPublished?: number;

  @IsUUID()
  @IsOptional()
  authorId?: AuthorId;
}
