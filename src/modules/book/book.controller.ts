import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post("add")
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Get("list")
  findAll() {
    return this.bookService.findAll();
  }
  @Post("first")
  fineFirst() {
    return this.bookService.findFirst();
  }
  @Get("detail")
  findOne(@Query("id") id: string) {
    return this.bookService.findOne(+id);
  }
}
