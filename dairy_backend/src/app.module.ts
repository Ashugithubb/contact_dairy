import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ContactModule } from './contact/contact.module';
import { TagModule } from './tag/tag.module';
import { PhoneNumberModule } from './phone-number/phone-number.module';
import { HasingModule } from './hasing/hasing.module';
import { AuthModule } from './auth/auth.module';
import { ContactTagModule } from './contact-tag/contact-tag.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule,
    ContactModule,
    TagModule,
    PhoneNumberModule,HasingModule,AuthModule, ContactTagModule, ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/files',
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
