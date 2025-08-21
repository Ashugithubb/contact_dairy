import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactTagDto } from './dto/create-contact-tag.dto';
import { UpdateContactTagDto } from './dto/update-contact-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactTag } from './entities/contact-tag.entity';
import { Repository } from 'typeorm';
import { Contact } from 'src/contact/entities/contact.entity';
import { TagService } from 'src/tag/tag.service';
import { Tag } from 'src/tag/entities/tag.entity';
@Injectable()
export class ContactTagService {
  constructor(@InjectRepository(ContactTag) private readonly contactTagRepositry: Repository<ContactTag>,
    @InjectRepository(Contact) private readonly contactRepositry: Repository<Contact>,
    private readonly tagService: TagService) { }
    
  // async create(createContactTagDto: CreateContactTagDto) {
    
  //   const { contactIds, tags } = createContactTagDto;

  //   const tagsToBeAdded = await this.tagService.create(tags);

  //   const tagsIds = tagsToBeAdded?.map((t: Tag) => t.id);
 
  //   const tagsAssigned: ContactTag[] = [];

  //   contactIds.forEach((c: number) => {
  //     tagsIds.forEach((t: number) => {
  //       const assignedTag = this.contactTagRepositry.create({
  //         contact: { id: c },
  //         tag: { id: t }
  //       });

  //       tagsAssigned.push(assignedTag);
  //     });
  //   });

  //   const contactAssigned = await this.contactTagRepositry.save(tagsAssigned);

  //   return contactAssigned;
  // }




  findAll() {
    return `This action returns all contactTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactTag`;
  }

  update(id: number, updateContactTagDto: UpdateContactTagDto) {
    return `This action updates a #${id} contactTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactTag`;
  }
}
