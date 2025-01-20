import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Reports } from './reports/reports.entity';

export const AppDataSource = new DataSource({
    type: 'sqlite', // Tipo de banco de dados
    database: process.env.NODE_ENV === 'test' ? 'test.sqlite' : 'db.sqlite',
    entities: [User, Reports], // Suas entidades
    migrations: ['src/migrations/*.ts'], // Pasta das migrações
    synchronize: false, // Certifique-se de usar migrações!
});

