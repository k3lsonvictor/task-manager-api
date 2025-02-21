import { ApiProperty } from "@nestjs/swagger";

export class SignInResponseDto {
  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    description: "Token JWT de autenticação do usuário",
  })
  access_token: string;

  @ApiProperty({
    example: "12345",
    description: "ID do usuário autenticado",
  })
  userId: string;
}
