import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ReportsModule } from 'src/reports/reports.module';
import { UsersModule } from 'src/users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');
import { AppDataSource } from 'src/data-source';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        UsersModule, 
        ReportsModule,
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                ...AppDataSource.options, // Use as opções do AppDataSource
            }),
        }),
        // TypeOrmModule.forRootAsync({
        //     inject: [ConfigService],
        //     useFactory: (config: ConfigService) => {
        //         return {
        //             type: 'sqlite',
        //             database: config.get<string>('DB_NAME'),
        //             synchronize: true,
        //             entities: [User, Reports]
        //         }
        //     }
        // })
        // TypeOrmModule.forRoot({
        //     type: 'sqlite',
        //     database: 'db.sqlite',
        //     entities: [User, Reports],
        //     synchronize: true
        // })
    ],
    providers: [AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true
              })
        }
    ],
    controllers: [AppController]
})
export class AppModule {
    constructor(private configService: ConfigService){}
    configure(consumer: MiddlewareConsumer){
        consumer.apply(cookieSession({
            keys: [this.configService.get('COOKIE_KEY')]
          })).forRoutes('*')
    }
}
