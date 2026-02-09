import { ApiProperty } from "@nestjs/swagger";

export class LoginUsuario { 

    @ApiProperty()
    public usuario: string;

    @ApiProperty()
    public senha: string;

 }