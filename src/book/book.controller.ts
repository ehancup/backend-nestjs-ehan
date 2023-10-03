import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto, FindBookDto } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getBook(@Query() query: FindBookDto) {
    console.log(query);
    return this.bookService.getAllBooks(query);
  }

  @Get('/:id')
  getBookById(@Param('id') id: number) {
    return this.bookService.findBook(id);
  }

  @Post()
  postBook(@Body() body: CreateBookDto) {
    return this.bookService.postBook(body);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }

  @Put('/:id')
  updateBook(@Body() book: UpdateBookDto, @Param('id') id: number) {
    return this.bookService.updateBook(Number(id), book);
  }
}
