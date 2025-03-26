import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';

@Module({
  providers: [BookRepository, BookService],
  controllers: [BookController],
})
export class BookModule {}
