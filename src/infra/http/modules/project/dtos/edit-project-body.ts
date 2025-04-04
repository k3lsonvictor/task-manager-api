import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditProjectBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
