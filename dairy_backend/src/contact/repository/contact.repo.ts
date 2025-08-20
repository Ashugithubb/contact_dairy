import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";





@Injectable()
export class ContactRepository extends Repository<Contact> {
  constructor(private datasource: DataSource,
  ) {
    super(Contact, datasource.createEntityManager());
  }
  
}