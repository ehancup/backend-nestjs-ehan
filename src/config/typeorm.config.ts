import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  // host: 'localhost',
  // port: 3306, //port default 3306 lihat xampp
  // username: 'root', // username default xampp root
  // password: '', // password default xampp string kosong
  url: 'mongodb+srv://hancup:hancup20@cluster0.gpzjnio.mongodb.net/?retryWrites=true&w=majority',
  // url: 'mongodb://127.0.0.1:27017',
  database: 'ehan', // database default
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true, //
  // logger: 'debug', // logger
};
