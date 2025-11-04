import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";

//表
import { Book } from "./entities/book.entity";
//注册表
import { TypeOrmModule } from "@nestjs/typeorm";

import { RedisModule } from "@/common/redis/redis.module";
@Module({
  //给servervice里面的模块用
  imports: [TypeOrmModule.forFeature([Book]), RedisModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
