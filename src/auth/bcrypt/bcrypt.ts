import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt { //BCryptService

    //criptografa a senha
    async encryptPassword(password: string): Promise<string> {
        let heels: number = 10; //numero de saltos (heels) para criptografia
        return await bcrypt.hash(password, heels); //embaralha a senha na quantidade de saltos informada e devolve um codigo hash
    }

    //compara a senha informada com a senha salva no banco de dados
    async comparePasswords(passwordInformed: string, passwordFromDatabase: string): Promise<boolean> {
        return await bcrypt.compare(passwordInformed, passwordFromDatabase);
    }

}