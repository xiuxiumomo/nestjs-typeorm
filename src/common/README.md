## 公共的模块部分

使用方法

- 1.先引入某个模块注意是在module中引入
```js
import { RedisModule } from "@/common/redis/redis.module";

@Module({
  //给servervice里面的模块用
  imports: [other, RedisModule],
  controllers: [BookController],
  providers: [BookService],
})
```
- 2.在service中使用
```js
import { RedisService } from "@/common/redis/redis.service";


export class BookService {
  constructor(
    private readonly redisService: RedisService,
  ) {}
}
```