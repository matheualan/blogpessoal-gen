import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { LoginUsuario } from '../entities/loginuser.entity';


@Injectable()
export class AuthService {

    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const buscaUsuario = await this.usuarioService.findByUser(username)

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.comparePasswords(password, buscaUsuario.senha)

        if(buscaUsuario && matchPassword){
            const { senha: password, ...resposta } = buscaUsuario
            return resposta
        }

        return null
    }

    async login(usuarioLogin: LoginUsuario) {
        const payload = { sub: usuarioLogin.email }

        const buscaUsuario = await this.usuarioService.findByUser(usuarioLogin.email)

        return{
            id: buscaUsuario?.id,
            nome: buscaUsuario?.nome,
            usuario: usuarioLogin.email,
            senha: '',
            foto: buscaUsuario?.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }
    
}