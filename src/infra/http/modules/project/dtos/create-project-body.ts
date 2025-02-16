import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProjectBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}