import { INestApplication } from "@nestjs/common";
import * as request from 'supertest'
import { AppModule } from  "../src/app/app.module";
import { Test, TestingModule } from "@nestjs/testing";

describe('Auth Controller (2e2)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Handles a signup request', () => {
        let email = 'atasdad@asdas.com'
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({email, password: 'asdasd'})
            .expect(201)
            .then((res) => {
                const {id, email} = res.body;
                expect(id).toBeDefined();
                expect(email).toEqual(email)
            })
    }) 
    it('Signup as a new user then get currently logged in user', async () => {
        const email = 'newemail@mail.com';

        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email,
                password: 'asdf'
            })
            .expect(201)

        const cookie = res.get('Set-Cookie');

        const { body } = await request(app.getHttpServer())
            .get('/auth/whoami')
            .set('Cookie', cookie)
            .expect(200)

        expect(body.email).toEqual(email)
    }); 
});