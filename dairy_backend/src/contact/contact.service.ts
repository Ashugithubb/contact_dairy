import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactRepository } from './repository/contact.repo';
import { PhoneRepository } from 'src/phone-number/repositry/phone-number.repo';
import { UserRepository } from 'src/user/repository/user.repo';
import { PhoneNumberService } from 'src/phone-number/phone-number.service';
import { TagService } from 'src/tag/tag.service';
import { Tag } from 'src/tag/entities/tag.entity';
import { GetContactQueryDto } from './dto/contact.query.dto';
import { ContactTag } from 'src/contact-tag/entities/contact-tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepo: ContactRepository,
    private readonly phoneService: PhoneNumberService,
    private readonly userRepo: UserRepository,
    private readonly tagService: TagService,
    @InjectRepository(ContactTag) private readonly contactTagRepo: Repository<ContactTag>
  ) { }

  // async create(createContactDto: CreateContactDto, userId: number) {
  //   const users = await this.userRepo.findOneBy({ userId });
  //   const { firstName, lastName, email, nickName, phoneNumbers,tags } = createContactDto;

  //   if (!users) throw new NotFoundException("User Not Found");

  //   const contact = this.contactRepo.create({
  //     firstName,
  //     lastName,
  //     nickName,
  //     email,
  //     userId,
  //     users
  //   })
  //   await this.contactRepo.save(contact);

  //   await this.phoneService.create(phoneNumbers, contact)
  //   return { "msg": "Contact Saved" }
  // }

  async create(createContactDto: CreateContactDto, userId: number) {
    const user = await this.userRepo.findOneBy({ userId });
    if (!user) throw new UnauthorizedException("Please LogedId to add Contact");
    const { firstName, lastName, email, nickName, phoneNumbers, tags } = createContactDto;

    const tagsToBeAdded = await this.tagService.create(tags);

    const exsitingContact = await this.contactRepo.find({
      where:{email,
        userId
      }
    })
    if(exsitingContact) throw new ConflictException("Already Contact exists");

    const tagsIds = tagsToBeAdded?.map((t: Tag) => t.id);
    const newContact = await this.contactRepo.create({
      firstName,
      lastName,
      nickName,
      email,
      userId,
      users: user
    })
    const contact = await this.contactRepo.save(newContact);
    await this.phoneService.create(phoneNumbers, contact)
    const contactId = contact.id;

    const tagsAssigned: ContactTag[] = [];

    tagsIds.forEach((t: number) => {
      const assignedTag = this.contactTagRepo.create({
        contact: { id: contactId },
        tag: { id: t }
      });
      tagsAssigned.push(assignedTag);
    });
    const contactAssigned = await this.contactTagRepo.save(tagsAssigned);

    return "contact Added";

  }








  async toggleFavourite(contactId: number) {
    const contact = await this.contactRepo.findOneBy({ id: contactId });
    if (!contact) throw new NotFoundException();
    if (contact.favorite === true) {
      contact.favorite = false;
    }
    if (contact.favorite === false) {
      contact.favorite = true;
    }
    await this.contactRepo.save(contact);
    return { "msg": "Contact Added To favourite" }
  }


  async toggleContactStatus(id: number) {
    const contact = await this.contactRepo.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!contact) {
      throw new Error("Contact not found");
    }
    if (contact.deletedAt) {

      await this.contactRepo.restore(id);
      return { message: "Contact restored successfully" };
    } else {
      await this.contactRepo.softDelete(id);
      return { message: "Contact deleted successfully" };
    }
  }


  async getContacts(query: GetContactQueryDto, userId: number) {
    const {
      page = 1,
      limit = 5,
      searchValue,
      tags,
      deleted
    } = query;
    const qb = this.contactRepo
      .createQueryBuilder("contacts")
      .leftJoinAndSelect("contacts.contactTag", "contactTag")
      .leftJoinAndSelect("contactTag.tag", "tag")
      .leftJoinAndSelect("contacts.phoneNumbers", "phoneNumber")

    qb.andWhere("contacts.userId = :userId", { userId });

    if (deleted === "true") {
      qb.withDeleted().andWhere("contacts.deletedAt IS NOT NULL");
      const [contacts, total] = await qb
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
      return {
        total,
        page,
        limit,
        contacts,
      };
    }
    if (searchValue) {
      qb.andWhere(
        '(contacts.firstName ILIKE :search OR contacts.lastName ILIKE :search)',
        { search: `%${searchValue}%` }
      );
    }

    if (tags) {
      qb.andWhere('tag.id IN (:...tagIds)', { tagIds: tags });
    }
    const [contacts, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return {
      total,
      page,
      limit,
      contacts,
    };
  }






  findAll() {
    return `This action returns all contact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

}
