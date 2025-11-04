import { Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
@Module({
  providers: [RedisService],
  //对外暴露
  exports: [RedisService],
})
export class RedisModule {}
