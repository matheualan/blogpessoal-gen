import { ApiProperty } from "@nestjs/swagger";

export class LoginUser { 

    @ApiProperty()
    public usuario: string;

    @ApiProperty()
    public senha: string;

 }