import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

//todo arquivo de teste começa com o describe
describe('Testes dos modulos de usuario e auth', () => {
  let app: INestApplication<App>; //cria app nest para teste
  let usuarioId: any;
  let token: any;

  //beforeEach ou beforeAll / each = executa uma vez a cada teste it / all = executa uma vez e faz todos os testes
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); //adc essa linha
    await app.init();
  });

  //para encerrar os recursos e nao ficar consumindo memoria depois dos testes rodarem
  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve cadastrar um novo usuário', async () => {
    const resp = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        email: 'root@root.com',
        senha: 'roootroot',
        foto: '-'
      })
      .expect(201);

    usuarioId = resp.body.id
  });

  it('02 - Não deve cadastrar um novo usuário se a senha tiver menos que 8 digitos', async () => {
    return await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        email: 'root@root.com',
        senha: 'root',
        foto: '-'
      })
      .expect(400);
  });

  it('03 - Não deve cadastrar um novo usuário duplicado', async () => {
    return await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        email: 'root@root.com',
        senha: 'roootroot',
        foto: '-'
      })
      .expect(400);
  });

  it('04 - Deve autenticar o usuario (Login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({ //os dados desse objeto veio do metodo 01
        usuario: 'root@root.com',
        senha: 'roootroot'
      })
      .expect(200);

    token = resposta.body.token;
  });

  it('05 - Listar todos os usuarios', async () => {
    return await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .expect(200);
  });

  it('06 - Deve atualizar um usuario', async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: 'Root atualizado',
        email: 'root@root.com',
        senha: 'rootroot',
        foto: '-'
      })
      .expect(200)
      .then(resposta => {
        expect('Root atualizado').toEqual(resposta.body.nome);
      });
  });

});