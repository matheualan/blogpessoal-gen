import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UserService } from '../../user/services/user.service';
import { LoginUser } from '../entities/loginuser.entity';


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const buscaUsuario = await this.userService.findByUser(username)

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.comparePasswords(password, buscaUsuario.password)

        if(buscaUsuario && matchPassword){
            const { password, ...resposta } = buscaUsuario
            return resposta
        }

        return null
    }

    async login(usuarioLogin: LoginUser) {
        const payload = { sub: usuarioLogin.user }

        const buscaUsuario = await this.userService.findByUser(usuarioLogin.user)

        return{
            id: buscaUsuario?.id,
            nome: buscaUsuario?.nome,
            usuario: usuarioLogin.user,
            senha: '',
            foto: buscaUsuario?.photo,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }
    
}