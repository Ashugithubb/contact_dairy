import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";


import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private datasource: DataSource,
  ) {
    super(User, datasource.createEntityManager());
  }
  
}