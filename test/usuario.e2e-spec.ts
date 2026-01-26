import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NOMEM } from 'dns';
import { emit } from 'process';

//todo arquivo de teste começa com o describe
describe('Testes dos modulos de usuario e auth', () => {
  let app: INestApplication<App>; //cria app nest para teste

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

  afterAll(async () => {
    await app.close();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

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

    // usuarioId = resp.body.id
  });

  it('02 - Não deve cadastrar um novo usuário', async () => {
    const resp = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        email: 'root@root.com',
        senha: 'root',
        foto: '-'
      })
      .expect(400);

    // usuarioId = resp.body.id
  });

});
