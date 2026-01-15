import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //nome do banco de dados (image)
      host: 'localhost', //caminho local da app, localhost para pc individual
      port: 3306, //porta do banco de dados
      username: 'root', //login do banco de dados (mariadb)
      password: 'root', //senha do banco de dados (mariadb)
      database: 'db_blogpessoal', //nome do database
      entities: [Postagem, Tema], //entidades da api para gerar tabela no db
      synchronize: true, //sincroniza com o banco de dados
      // logging: true, //aparece log sql do typeorm no terminal
    }),
    PostagemModule, //modulos que eu criei
    TemaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}