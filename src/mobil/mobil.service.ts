import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MobilEntity } from './mobil.entity';
import { Repository, Between, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from '../interface/response/base.response';
import { ResponseSuccess } from 'src/interface/response';
import {
  CreateMobilDto,
  DeleteMobilBulk,
  FindMobilDto,
  UpdateMobilDto,
  createMobilArrayDto,
} from './mobil.dto';

@Injectable()
export class MobilService extends BaseResponse {
  constructor(
    @InjectRepository(MobilEntity)
    private readonly mobilRepository: Repository<MobilEntity>,
  ) {
    super();
  }

  validateCar(carDto: CreateMobilDto): boolean {
    const { merek_mobil, tipe_mobil } = carDto;
    if (merek_mobil === 'honda') {
      return ['CRV', 'BRV', 'HRV'].includes(tipe_mobil);
    } else if (merek_mobil === 'toyota') {
      return ['Avanza', 'Innova', 'Raize'].includes(tipe_mobil);
    } else if (merek_mobil === 'suzuki') {
      return ['Ertiga', 'XL7', 'baleno'].includes(tipe_mobil);
    }
    return false;
  }

  async getAllMobil(query: FindMobilDto): Promise<ResponseSuccess> {
    const { merek, tipe, from_price, to_price, from_year, to_year } = query;

    const filter: {
      [key: string]: any;
    } = {};

    if (merek) {
      filter.merek_mobil = Like(`%${merek}%`);
    }
    if (tipe) {
      filter.tipe_mobil = Like(`%${tipe}%`);
    }

    if (from_year && to_year) {
      filter.tahun = Between(from_year, to_year);
    }

    if (from_year && !!to_year === false) {
      filter.tahun = Between(from_year, from_year);
    }

    if (from_price && to_price) {
      filter.harga = Between(from_price, to_price);
    }

    if (from_price && !!to_price === false) {
      filter.harga = Between(from_price, from_price);
    }
    // return this.books;
    try {
      const getMobil = await this.mobilRepository.find({
        where: filter,
      });
      return {
        status: 'ok',
        message: `${getMobil.length} Mobil found`,
        data: getMobil,
      };
    } catch (err) {
      return this._success('not ok', err);
    }
  }

  async findUser(id: number): Promise<ResponseSuccess> {
    // const foundBook = this.books.find((book) => book.id == id);

    // if (!foundBook) return 'no book found';
    // return foundBook;

    const foundMobil = await this.mobilRepository.findOne({ where: { id } });

    if (!foundMobil)
      throw new HttpException(
        `Mobil with ${id} not found, try another id`,
        HttpStatus.NOT_FOUND,
      );
    return {
      status: 'ok',
      message: `Mobil found`,
      data: foundMobil,
    };
  }

  async postMobil(mobil: CreateMobilDto): Promise<ResponseSuccess> {
    const hasil = this.validateCar(mobil);
    if (!hasil)
      throw new HttpException(
        'tipe tidak valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    try {
      this.mobilRepository.save(mobil);

      return this._success(
        'ok',
        `Book ${mobil.nama} successfully added`,
        mobil,
      );
    } catch (err) {
      return {
        status: 'not ok',
        message: err,
      };
    }
  }

  async updateUser(
    id: number,
    mobil: UpdateMobilDto,
  ): Promise<ResponseSuccess> {
    const check = await this.mobilRepository.findOne({ where: { id } });

    if (!check)
      throw new HttpException(
        `Buku dengan id ${id} tidak ditemukan`,
        HttpStatus.NOT_FOUND,
      );

    const hasil = this.validateCar(mobil);
    if (!hasil)
      throw new HttpException(
        `tipe ${mobil.tipe_mobil} tidak valid untuk merek ${mobil.merek_mobil}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    try {
      await this.mobilRepository.save({ ...mobil, id });

      return {
        status: 'ok',
        message: 'data successfully updated',
        data: { id, ...mobil },
      };
    } catch (err) {
      return {
        status: 'not ok',
        message: err,
      };
    }
  }

  async deleteUser(id: number): Promise<ResponseSuccess> {
    const foundedUser = await this.mobilRepository.findOne({
      where: { id: id },
    });
    if (!foundedUser)
      throw new HttpException(
        `book with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    try {
      await this.mobilRepository.delete(id);

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

  async bulkCreate(payload: createMobilArrayDto): Promise<ResponseSuccess> {
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.data.map(async (data) => {
          try {
            const hasil = this.validateCar(data);
            if (!hasil) throw new Error();

            await this.mobilRepository.save(data);

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

  async deleteBulk(array: DeleteMobilBulk) {
    console.log('deleteBulk', array);
    let berhasil = 0;
    let gagal = 0;

    await Promise.all(
      array.delete.map(async (id) => {
        console.log(id);
        try {
          const result = await this.mobilRepository.delete(id);
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
