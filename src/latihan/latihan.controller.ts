import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { LatihanService } from './latihan.service';

interface paramQuery {
  page?: number;
  name?: string;
  kelas?: string;
}

@Controller('latihan')
export class LatihanController {
  constructor(private latihanService: LatihanService) {}

  @Get('data')
  findAll(@Query() query: paramQuery, @Body() response: any) {
    return this.latihanService.getLatihanQuery(query, response);
  }

  @Post()
  create(@Body() payload: any) {
    return { payload: payload };
  }
  @Post('create')
  create2(@Body('name') name: string, @Body('kelas') kelas: string) {
    return {
      payload: {
        name: name,
        kelas: kelas,
      },
    };
  }

  @Put('update/:id')
  update(@Body() payload: any, @Param('id') id: string) {
    return {
      id,
      payload: payload,
    };
  }

  @Patch()
  patch() {
    return this.latihanService.getLatihan();
  }

  @Delete()
  delete() {
    return 'latihan dg method DELETE';
  }
}
