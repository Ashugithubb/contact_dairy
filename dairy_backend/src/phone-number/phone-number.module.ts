import { Module } from '@nestjs/common';
import { PhoneNumberService } from './phone-number.service';
import { PhoneNumberController } from './phone-number.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumber } from './entities/phone-number.entity';
import { PhoneRepository } from './repositry/phone-number.repo';

@Module({
   imports:[TypeOrmModule.forFeature([PhoneNumber])],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService,PhoneRepository],
  exports:[PhoneNumberService,PhoneRepository]
})
export class PhoneNumberModule {}
