import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditStageBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  projectId: string;
}