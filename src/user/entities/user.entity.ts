import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({ name: 'tb_users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false })
    @IsNotEmpty()
    nome: string;

    @Column({ length: 255, nullable: false })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column({ length: 255, nullable: false })
    password: string;

    @Column({ length: 5000 })
    photo: string;

    @OneToMany(() => Postagem, (postagem) => postagem.user)
    postagens: Postagem[];

}