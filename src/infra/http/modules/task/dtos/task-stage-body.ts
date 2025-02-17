import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskBody {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  stageId: string;

  @IsString()
  @IsOptional()
  description?: string;
}