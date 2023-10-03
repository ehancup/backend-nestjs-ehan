import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('apalahkek')
  getApalahkek(): string {
    return 'belajar routing';
  }

  @Post('create')
  create() {
    return 'belajar routing dg method POST';
  }
}
