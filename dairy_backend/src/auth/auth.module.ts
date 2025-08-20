
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { HasingModule } from 'src/hasing/hasing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt.auth';



@Module({
  imports: [UserModule,HasingModule,ConfigModule,JwtModule.registerAsync({
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
     signOptions: { expiresIn: '10m' }
    }),
    inject: [ConfigService],
    global: true,
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,
]
})
export class AuthModule { }