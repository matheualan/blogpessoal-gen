import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_postagens'})
export class Postagem {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({length: 100, nullable: false})
    @IsNotEmpty()
    titulo: string;

    @ApiProperty()
    @Column({length: 1000, nullable: false})
    @IsNotEmpty()
    texto: string;

    @ApiProperty()
    @UpdateDateColumn()
    data: Date;

    @ApiProperty({ type: () => Tema })
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: 'CASCADE',
    })
    tema: Tema;

    @ApiProperty({ type: () => Usuario })
    @ManyToOne(() => Usuario, (usuario) => usuario.postagens, {
        onDelete: 'CASCADE',
    })
    usuario: Usuario;

}