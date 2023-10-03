import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { ResponseSuccess } from 'src/interface/response';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from 'src/interface/response/base.response';
import { CreateUserDto, UpdateUserDto, createBookArrayDto } from './user.dto';

@Injectable()
export class UserService extends BaseResponse {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async getAllUsers(): Promise<ResponseSuccess> {
    // return this.books;
    try {
      const getUsers = await this.userRepository.find();
      return {
        status: 'ok',
        message: `${getUsers.length} Books found`,
        data: getUsers,
      };
    } catch (err) {
      return this._success('not ok', err);
    }
  }

  async findUser(id: number): Promise<ResponseSuccess> {
    // const foundBook = this.books.find((book) => book.id == id);

    // if (!foundBook) return 'no book found';
    // return foundBook;

    const foundUser = await this.userRepository.findOne({ where: { id } });

    if (!foundUser)
      throw new HttpException(
        `Book ${id} not found, try another id`,
        HttpStatus.NOT_FOUND,
      );
    return {
      status: 'ok',
      message: `Books found`,
      data: foundUser,
    };
  }

  async postUser(user: CreateUserDto): Promise<ResponseSuccess> {
    const foundUser = await this.userRepository.findOne({
      where: { nama: user.nama },
    });

    if (foundUser)
      throw new HttpException(
        `User ${user.nama} is already exist, try with another title`,
        HttpStatus.CONFLICT,
      );
    try {
      this.userRepository.save(user);

      return this._success('ok', `Book ${user.nama} successfully added`, user);
    } catch (err) {
      return {
        status: 'not ok',
        message: err,
      };
    }
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<ResponseSuccess> {
    const check = await this.userRepository.findOne({ where: { id } });

    if (!check)
      throw new HttpException(
        `Buku dengan id ${id} tidak ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    try {
      await this.userRepository.save({ ...user, id });

      return {
        status: 'ok',
        message: 'data successfully updated',
        data: { id, ...user },
      };
    } catch (err) {
      return {
        status: 'not ok',
        message: err,
      };
    }
  }

  async deleteUser(id: number): Promise<ResponseSuccess> {
    const foundedUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!foundedUser)
      throw new HttpException(
        `book with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    try {
      await this.userRepository.delete(id);

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

  async bulkCreate(payload: createBookArrayDto): Promise<ResponseSuccess> {
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.data.map(async (data) => {
          try {
            await this.userRepository.save(data);

            berhasil += 1;
          } catch {
            gagal += 1;
          }
        }),
      );

      return this._success(
        'ok',
        `Berhasil menyimpan ${berhasil} dan gagal ${gagal}`,
      );
    } catch {
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteBulk(array: { delete: number[] }) {
    let berhasil = 0;
    let gagal = 0;

    await Promise.all(
      array.delete.map(async (id) => {
        try {
          const result = await this.userRepository.delete(id);
          console.log(result);

          if (result.affected === 0) {
            gagal += 1;
          } else {
            berhasil += 1;
          }
        } catch {
          gagal += 1;
        }
      }),
    );

    return this._success(
      'ok',
      `Berhasil menghpus ${berhasil} dan gagal ${gagal}`,
    );
  }
}
