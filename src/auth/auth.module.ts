import { Module } from "@nestjs/common";
import { BCrypt } from "./bcrypt/bcrypt";

@Module({
    imports: [],
    controllers: [],
    providers: [BCrypt],
    exports: [BCrypt]
})
export class AuthModule { }