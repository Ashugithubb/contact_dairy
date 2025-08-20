import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PhoneNumber } from "../entities/phone-number.entity";


@Injectable()
export class PhoneRepository extends Repository<PhoneNumber> {
  constructor(private datasource: DataSource,
  ) {
    super(PhoneNumber, datasource.createEntityManager());
  }
  
}