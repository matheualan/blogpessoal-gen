import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { Repository } from "typeorm";

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private userRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findByUser(email: string): Promise<Usuario | null> {
        return await this.userRepository.findOne({
            where: {
                email: email
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<Usuario> {
        const usuario = await this.userRepository.findOne({
            where: {
                id: id
            }
        });

        if (!usuario) throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async create(user: Usuario): Promise<Usuario> {
        const buscaUsuario = await this.findByUser(user.email);

        if (buscaUsuario) throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);

        user.senha = await this.bcrypt.encryptPassword(user.senha)
        return await this.userRepository.save(user);
    }

    async update(user: Usuario): Promise<Usuario> {
        await this.findById(user.id);

        const buscaUsuario = await this.findByUser(user.senha);

        if (buscaUsuario && buscaUsuario.id !== user.id) throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        user.senha = await this.bcrypt.encryptPassword(user.senha)
        return await this.userRepository.save(user);
    }

}