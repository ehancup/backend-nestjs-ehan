import { Module } from '@nestjs/common';
import { MobilController } from './mobil.controller';
import { MobilService } from './mobil.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobilEntity } from './mobil.entity';

@Module({
  controllers: [MobilController],
  providers: [MobilService],
  imports: [TypeOrmModule.forFeature([MobilEntity])],
})
export class MobilModule {}
