import { Module } from '@nestjs/common';
import { ContactTagService } from './contact-tag.service';
import { ContactTagController } from './contact-tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactTag } from './entities/contact-tag.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports:[TypeOrmModule.forFeature([ContactTag,Contact,Tag]),TagModule],
  controllers: [ContactTagController],
  providers: [ContactTagService],
})
export class ContactTagModule {}
