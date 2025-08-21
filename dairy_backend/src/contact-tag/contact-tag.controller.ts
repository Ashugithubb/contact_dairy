import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactTagService } from './contact-tag.service';
import { CreateContactTagDto } from './dto/create-contact-tag.dto';
import { UpdateContactTagDto } from './dto/update-contact-tag.dto';

@Controller('contact-tag')
export class ContactTagController {
  constructor(private readonly contactTagService: ContactTagService) {}

  //@Post()
  // create(@Body() createContactTagDto: CreateContactTagDto) {
  //   console.log("inside controller",createContactTagDto)
  //   return this.contactTagService.create(createContactTagDto);
  // }

  @Get()
  findAll() {
    return this.contactTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactTagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactTagDto: UpdateContactTagDto) {
    return this.contactTagService.update(+id, updateContactTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactTagService.remove(+id);
  }
}
