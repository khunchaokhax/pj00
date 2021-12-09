import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pj00',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
