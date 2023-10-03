import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { MobilService } from './mobil.service';
import {
  CreateMobilDto,
  DeleteMobilBulk,
  FindMobilDto,
  UpdateMobilDto,
  createMobilArrayDto,
} from './mobil.dto';

@Controller('mobil')
export class MobilController {
  constructor(private mobilService: MobilService) {}

  @Get('/')
  getAllUser(@Query() query: FindMobilDto) {
    return this.mobilService.getAllMobil(query);
  }

  @Get('/:id')
  findMobil(@Param('id') id: string) {
    return this.mobilService.findUser(Number(id));
  }

  @Post('/post')
  postMobil(@Body() payload: CreateMobilDto) {
    return this.mobilService.postMobil(payload);
  }

  @Post('/post/bulk')
  postBulk(@Body() payload: createMobilArrayDto) {
    return this.mobilService.bulkCreate(payload);
  }

  @Put('/update/:id')
  updateUser(@Param('id') id: number, @Body() payload: UpdateMobilDto) {
    return this.mobilService.updateUser(Number(id), payload);
  }

  @Delete('/delete/:id')
  deleteUserBulk(@Param('id') id: number) {
    return this.mobilService.deleteUser(Number(id));
  }

  @Post('/delete/bulk')
  deleteBulk(@Body() payload: DeleteMobilBulk) {
    console.log('db ok', payload);
    return this.mobilService.deleteBulk(payload);
  }
}
