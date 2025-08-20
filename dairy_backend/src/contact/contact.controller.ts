import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';
import { GetContactQueryDto } from './dto/contact.query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createContactDto: CreateContactDto, @Req() req) {

    const userId = req.user.id;
   
    return this.contactService.create(createContactDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: GetContactQueryDto, @Req() req) {
    const userId = req.user.id
    return this.contactService.getContacts(query, userId);
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, `${file.fieldname}-${uniqueSuffix}-${extname(file.originalname)}`)
      }
    })
  }))
  async uploadFile(@UploadedFile(new ParseFilePipe({
    fileIsRequired: true,
    validators: [new MaxFileSizeValidator({ maxSize: 1000000 }),]
  })) file: Express.Multer.File) {
    return this.contactService.uplodImage(file);
  }


  @Patch(":id")
  update(@Param('id') id: string,@Body()updateContact:UpdateContactDto){
    return this.contactService.updateContact(+id,updateContact);
  }
  
  @Patch(':id/favourite')
  favourite(@Param('id') id: string) {
    return this.contactService.toggleFavourite(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.toggleContactStatus(+id);
  }


}
