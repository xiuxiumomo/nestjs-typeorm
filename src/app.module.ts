import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookModule } from "./modules/book/book.module";
import { RedisModule } from "@nestjs-modules/ioredis";

//mysql配置
import config from "config";
const { host, port, username, password, database } = config.get("mysql");

const { host: rhost, port: rport, password: rpassword } = config.get("redis");
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host,
      port,
      username,
      password,
      database,
      // Ensure the glob has a path separator so compiled JS files are matched (dist/...)
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      connectTimeout: 5 * 60 * 1000, // 连接超时：5分钟
      // 扩展连接池配置
      extra: {
        connectionLimit: 20, // 最大连接数
        waitForConnections: true, // 当连接池满时是否等待
        queueLimit: 0, // 等待队列数量（0 = 不限制）
      },
    }),
    RedisModule.forRoot({
      type: "single",
      url: `redis://${rhost}:${rport}`,
      options: {
        password: rpassword,
      },
    }),
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
