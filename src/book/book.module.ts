import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';

@Module({
  providers: [BookService],
  controllers: [BookController],
  imports: [TypeOrmModule.forFeature([Book])],
})
export class BookModule {}
