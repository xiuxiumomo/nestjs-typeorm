import { Injectable } from "@nestjs/common";
//book表
import { Book } from "./entities/book.entity";
//book添加数据的约束
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

// typeorm
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
@Injectable()
export class BookService {
  constructor(
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
      console.log(res, "res");
      return res;
    } catch (e) {
      throw new Error(`请求出错-${e}`);
    }
  }

  async findOne(id: number) {
    console.log(id, "当前id");
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
