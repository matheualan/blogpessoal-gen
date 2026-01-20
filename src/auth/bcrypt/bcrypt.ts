import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BCrypt { //BCryptService

    async encryptPassword(password: string): Promise<string> {
        let heels: number = 10;
        return await bcrypt.hash(password, heels);
    }

    async comparePasswords(passwordInformed: string, passwordFromDatabase: string): Promise<boolean> {
        return await bcrypt.compare(passwordInformed, passwordFromDatabase);
    }

}