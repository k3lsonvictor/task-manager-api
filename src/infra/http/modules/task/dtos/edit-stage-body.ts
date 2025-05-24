import { Optional } from "@nestjs/common";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class EditTaskBody {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  stageId: string;

  @IsOptional()
  @Optional()
  @IsNumber()
  position?: number;

  @IsOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  tagId?: string;

  @IsOptional()
  @IsOptional()
  @IsDate()
  dueDate?: Date;
}
