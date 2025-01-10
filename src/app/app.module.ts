import { Module } from '@nestjs/common';
import { ReportsModule } from 'src/reports/reports.module';
import { UsersModule } from 'src/users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        UsersModule, 
        ReportsModule,
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [],
            synchronize: true
        })
    ],
    providers: [AppService],
    controllers: [AppController]
})
export class AppModule {}
