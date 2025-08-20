import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';
import { GetContactQueryDto } from './dto/contact.query.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createContactDto: CreateContactDto, @Req() req) {

    const userId = req.user.id;
    console.log(userId)
    return this.contactService.create(createContactDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: GetContactQueryDto, @Req() req) {
    const userId = req.user.id
    return this.contactService.getContacts(query, userId);
  }


  @Post(':id')
  favourite(@Param('id') id: string) {
    return this.contactService.toggleFavourite(+id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.toggleContactStatus(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }
}
