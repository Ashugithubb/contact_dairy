import { Injectable } from '@nestjs/common';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { UpdatePhoneNumberDto } from './dto/update-phone-number.dto';
import { PhoneRepository } from './repositry/phone-number.repo';
import { Contact } from 'src/contact/entities/contact.entity';

@Injectable()
export class PhoneNumberService {
  constructor(private readonly phoneRepo: PhoneRepository,) { }

  async create(phoneNumbers: string[], contact: Contact) {
    const phoneNumberEntity = phoneNumbers.map((p) => ({
      phoneNumber:p,
      PhoneNumberContact:contact
    }))
    return await this.phoneRepo.save(phoneNumberEntity);
  }


  findAll() {
    return `This action returns all phoneNumber`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phoneNumber`;
  }

  update(id: number, updatePhoneNumberDto: UpdatePhoneNumberDto) {
    return `This action updates a #${id} phoneNumber`;
  }

  remove(id: number) {
    return `This action removes a #${id} phoneNumber`;
  }
}
