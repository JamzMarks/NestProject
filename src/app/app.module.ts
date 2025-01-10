import { Module } from '@nestjs/common';
import { ReportsModule } from 'src/reports/reports.module';
import { UsersModule } from 'src/users/users.module';
import { AppService } from './app.service';

@Module({
    imports: [UsersModule, ReportsModule],
    providers: [AppService]
})
export class AppModule {}
