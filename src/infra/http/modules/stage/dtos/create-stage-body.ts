import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStageBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
