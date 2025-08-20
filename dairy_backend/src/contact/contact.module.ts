import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactRepository } from './repository/contact.repo';
import { PhoneNumberModule } from 'src/phone-number/phone-number.module';
import { UserModule } from 'src/user/user.module';
import { TagModule } from 'src/tag/tag.module';
import { ContactTag } from 'src/contact-tag/entities/contact-tag.entity';

@Module({
   imports:[TypeOrmModule.forFeature([Contact,ContactTag]),PhoneNumberModule,UserModule,TagModule],
  controllers: [ContactController],
  providers: [ContactService,ContactRepository],
  exports:[ContactService,ContactRepository],
})
export class ContactModule {}
