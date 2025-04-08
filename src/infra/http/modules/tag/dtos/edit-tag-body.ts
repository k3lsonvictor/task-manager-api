import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditTagBody {
  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  tagId: string;

  @IsOptional()
  @IsString()
  color?: string;
}
