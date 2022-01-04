import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entitys/user';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' }
  })
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
