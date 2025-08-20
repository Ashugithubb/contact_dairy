import { PartialType } from '@nestjs/mapped-types';
import { CreateContactTagDto } from './create-contact-tag.dto';

export class UpdateContactTagDto extends PartialType(CreateContactTagDto) {}
