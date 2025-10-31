import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookModule } from "./modules/book/book.module";
import config from "config";
const { host, port, username, password, database } = config.get("mysql");
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
      // alternatively, you can use `autoLoadEntities: true` and register entities via forFeature
      // autoLoadEntities: true,
    }),
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
