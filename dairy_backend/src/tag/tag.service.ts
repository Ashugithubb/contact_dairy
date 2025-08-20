import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagsRepo:Repository<Tag>){}

  async create(tagNames: string[]) {
    
  const tagsToInsert = tagNames?.map((tagName) => ({ tagName }));
  
  const tags = await this.tagsRepo.upsert(tagsToInsert, ['tagName']); 

  return tags?.raw ?? [];
}

  async findAll() {
    return await  this.tagsRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
