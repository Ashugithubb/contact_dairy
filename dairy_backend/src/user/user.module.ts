import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repo';
import { HasingModule } from 'src/hasing/hasing.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),HasingModule],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports:[UserService,UserRepository]
})
export class UserModule {}
