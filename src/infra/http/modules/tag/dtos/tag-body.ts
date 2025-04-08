import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTagBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsOptional()
  color: string;
}
