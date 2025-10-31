import { IsNotEmpty } from "class-validator";
export class CreateBookDto {
  @IsNotEmpty()
  title: string;
  cover: string;
}
