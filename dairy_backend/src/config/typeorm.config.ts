import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { PhoneNumber } from 'src/phone-number/entities/phone-number.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { ContactTag } from 'src/contact-tag/entities/contact-tag.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities:[User,PhoneNumber,Contact,Tag],
    synchronize: false,
  }),
};