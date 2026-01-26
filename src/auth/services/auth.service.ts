import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioService } from '../../user/services/usuario.service';
import { LoginUser } from '../entities/loginuser.entity';


@Injectable()
export class AuthService {

    constructor(
        private userService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const buscaUsuario = await this.userService.findByUser(username)

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.comparePasswords(password, buscaUsuario.senha)

        if(buscaUsuario && matchPassword){
            const { senha: password, ...resposta } = buscaUsuario
            return resposta
        }

        return null
    }

    async login(usuarioLogin: LoginUser) {
        const payload = { sub: usuarioLogin.usuario }

        const buscaUsuario = await this.userService.findByUser(usuarioLogin.usuario)

        return{
            id: buscaUsuario?.id,
            nome: buscaUsuario?.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            foto: buscaUsuario?.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }
    
}