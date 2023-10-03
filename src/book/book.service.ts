import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseSuccess, ResponsePagination } from 'src/interface/response';
import { InjectRepository } from '@nestjs/typeorm'; // import injectReposity
import { Book } from './book.entity'; // import Book Entiy
import { Repository } from 'typeorm'; //import repository
import { CreateBookDto, UpdateBookDto, FindBookDto } from './book.dto';
import { BaseResponse } from 'src/interface/response/base.response';

interface Books {
  id?: number;
  title: string;
  author: string;
  year: number;
}

@Injectable()
export class BookService extends BaseResponse {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {
    super();
  }
  private books: Books[] = [
    {
      id: 1,
      title: 'hancup book',
      author: 'hancup',
      year: 2023,
    },
  ];

  async getAllBooks(query: FindBookDto): Promise<ResponsePagination> {
    // return this.books;
    // try {

    const { page, pageSize } = query;
    const total = await this.bookRepository.count();
    const getBooks = await this.bookRepository.find({
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
    });
    return {
      status: 'ok',
      message: `${getBooks.length} Books found`,
      data: getBooks,
      pagination: {
        total,
        page,
        pageSize,
      },
    };
    // } catch (err) {
    //   return this._success('not ok', err);
    // }
  }

  async findBook(id: number): Promise<ResponseSuccess> {
    // const foundBook = this.books.find((book) => book.id == id);

    // if (!foundBook) return 'no book found';
    // return foundBook;

    const foundBook = await this.bookRepository.findOne({ where: { id } });
    console.log(foundBook);

    if (!foundBook)
      throw new HttpException(
        `Book ${id} not found, try another id`,
        HttpStatus.NOT_FOUND,
      );
    return {
      status: 'ok',
      message: `Books found`,
      data: foundBook,
    };
  }

  async postBook(book: CreateBookDto): Promise<ResponseSuccess> {
    const foundBook = await this.bookRepository.findOne({
      where: { title: book.title },
    });

    if (foundBook)
      throw new HttpException(
        `Book ${book.title} is already exist, try with another title`,
        HttpStatus.CONFLICT,
      );
    try {
      this.bookRepository.save(book);

      return this._success('ok', `Book ${book.title} successfully added`, book);
    } catch (err) {
      return {
        status: 'not ok',
        message: err,
      };
    }
  }

  async deleteBook(id: number): Promise<ResponseSuccess> {
    const foundedBook = await this.bookRepository.findOne({
      where: { id: id },
    });
    if (!foundedBook)
      throw new HttpException(
        `book with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    try {
      await this.bookRepository.delete(id);

      return {
        status: 'ok',
        message: 'Book deleted successfully',
      };
    } catch (err) {
      return {
        status: 'not ok',
        message: err,
      };
    }
  }

  async updateBook(id: number, book: UpdateBookDto): Promise<ResponseSuccess> {
    const check = await this.bookRepository.findOne({ where: { id } });

    if (!check)
      throw new HttpException(
        `Buku dengan id ${id} tidak ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    try {
      await this.bookRepository.save({ ...book, id });

      return {
        status: 'ok',
        message: 'data successfully updated',
        data: { id, ...book },
      };
    } catch (err) {
      return {
        status: 'not ok',
        message: err,
      };
    }
  }
}
