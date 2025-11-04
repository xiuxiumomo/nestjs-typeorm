import { Injectable } from "@nestjs/common";
//book 表
import { Book } from "./entities/book.entity";
//book 添加数据的约束
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
//typeorm
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//redis采用公共模块
import { RedisService } from "@/common/redis/redis.service";
import { bookRedis } from "@/utils/redis-key.utils";
@Injectable()
export class BookService {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}
  async create(createBookDto: CreateBookDto) {
    try {
      const book = new Book();
      const { title, cover } = createBookDto;
      book.title = title;
      book.cover = cover;
      const res = await this.bookRepository.save(book);
      return {
        ...res,
      };
    } catch (e) {
      throw new Error(`请求出错-${e}`);
    }
  }

  async findAll() {
    try {
      const res = await this.bookRepository.createQueryBuilder("book").getMany();
      return res;
    } catch (e) {
      throw new Error(`请求出错-${e}`);
    }
  }
  async findFirst() {
    const { key: cacheKey, ttl } = bookRedis();
    try {
      const cached = await this.redisService.get(cacheKey);
      console.log(cached, "是否有缓存数据");
      if (cached) {
        return cached;
      }
      const res = await this.bookRepository.createQueryBuilder("book").take(15).getMany();
      console.log(res, "数据库数据");
      await this.redisService.set(cacheKey, res, ttl);
      return res;
    } catch (e) {
      throw new Error(`请求出错-${e}`);
    }
  }

  async findOne(id: number) {
    if (!id) return Promise.reject("id不能为空");
    try {
      const res = await this.bookRepository
        .createQueryBuilder("book")
        .where("book.id = :id", { id })
        .getOne();
      return {
        ...res,
      };
    } catch (e) {
      throw new Error(`请求出错-${e}`);
    }
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
