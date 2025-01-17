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

    it('Handles a signup reques', () => {
        let email = 'ads@asdas.com'
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
})