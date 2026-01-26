import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../user/entities/usuario.entity";

@Entity({name: 'tb_postagens'})
export class Postagem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    @IsNotEmpty()
    titulo: string;

    @Column({length: 1000, nullable: false})
    @IsNotEmpty()
    texto: string;

    @UpdateDateColumn()
    data: Date;

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: 'CASCADE',
    })
    tema: Tema;

    @ManyToOne(() => Usuario, (user) => user.postagens, {
        onDelete: 'CASCADE',
    })
    user: Usuario;

}