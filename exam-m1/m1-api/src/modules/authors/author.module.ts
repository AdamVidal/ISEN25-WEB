import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';

@Module({
  controllers: [AuthorController],
  providers: [AuthorRepository, AuthorService],
})
export class AuthorModule {}
