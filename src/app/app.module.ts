import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ReportsModule } from 'src/reports/reports.module';
import { UsersModule } from 'src/users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Reports } from 'src/reports/reports.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        UsersModule, 
        ReportsModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: 'sqlite',
                    database: config.get<string>('DB_NAME'),
                    synchronize: true,
                    entities: [User, Reports]
                }
            }
        })
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
    configure(consumer: MiddlewareConsumer){
        consumer.apply(cookieSession({
            keys: ['asdfa']
          })).forRoutes('*')
    }
}
