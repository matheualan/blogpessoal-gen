import { ApiProperty } from "@nestjs/swagger";

export class LoginUsuario { 

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public senha: string;

 }