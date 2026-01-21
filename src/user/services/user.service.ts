import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) { }

    async findByUser(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {
                email: email
            }
        })
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<User> {
        const usuario = await this.userRepository.findOne({
            where: {
                id: id
            }
        });

        if (!usuario) throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async create(user: User): Promise<User> {
        const buscaUsuario = await this.findByUser(user.email);

        if (buscaUsuario) throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);

        user.password = await this.bcrypt.encryptPassword(user.password)
        return await this.userRepository.save(user);
    }

    async update(user: User): Promise<User> {
        await this.findById(user.id);

        const buscaUsuario = await this.findByUser(user.password);

        if (buscaUsuario && buscaUsuario.id !== user.id) throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        user.password = await this.bcrypt.encryptPassword(user.password)
        return await this.userRepository.save(user);
    }

}