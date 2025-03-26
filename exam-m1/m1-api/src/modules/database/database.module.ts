import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { BookEntity } from './entities/book.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([AuthorEntity, BookEntity]),
  ],
})
export class DatabaseModule {}
