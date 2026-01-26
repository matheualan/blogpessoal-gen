import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'tb_usuarios' })
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ length: 255, nullable: false })
    @IsNotEmpty()
    @ApiProperty()
    nome: string;

    @Column({ length: 255, nullable: false })
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: "seuemail@email.com" })
    email: string;

    @Column({ length: 255, nullable: false })
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    senha: string;

    @Column({ length: 5000 })
    @ApiProperty()
    foto: string;

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.user)
    postagens: Postagem[];

}