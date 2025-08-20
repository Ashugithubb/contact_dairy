import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repo';
import { HasingService } from 'src/hasing/hasing.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepo:UserRepository,
    private readonly hasingService:HasingService
  ){}

async create(createUserDto: CreateUserDto) {
  const {email} = createUserDto;
  const existing = await this.userRepo.findOneBy({email});
  if(existing) throw new ConflictException("User Already Exist");

  createUserDto.password = await this.hasingService.hashPassword(createUserDto.password)
    await this.userRepo.save(createUserDto);
    return {"msg":"User Registred SuccessFully"}
  }
  
  async findOneByEmail(email:string){
    return await this.userRepo.findOne({
      where:{
        email:email
      },
      select:["userId","email","firstName","lastName","password"]
    })
  }


  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
