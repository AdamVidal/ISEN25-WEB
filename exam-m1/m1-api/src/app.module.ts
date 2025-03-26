import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './modules/authors/author.module';
import { BookModule } from './modules/books/book.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [AuthorModule, BookModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
