import { Injectable } from '@nestjs/common';

@Injectable()
export class LatihanService {
  getLatihan() {
    return 'hello world latihan service';
  }

  getLatihanQuery(query: any, ...data: any[]) {
    return {
      data,
      query,
    };
  }
}
