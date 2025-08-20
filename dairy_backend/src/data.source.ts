import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { PhoneNumber } from './phone-number/entities/phone-number.entity';
import { Contact } from './contact/entities/contact.entity';
import { Tag } from './tag/entities/tag.entity';
import { ContactTag } from './contact-tag/entities/contact-tag.entity';


dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities:[User,PhoneNumber,Contact,Tag,ContactTag],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
});
export default AppDataSource;