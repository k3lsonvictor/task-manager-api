import { IsOptional, IsString } from "class-validator";

export class EditTagBody {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  color?: string;
}
