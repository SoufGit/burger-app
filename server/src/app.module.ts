import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendarEventsModule } from './calendarEvents/calendarEvents.module';
import { EmployeesModule } from './employees/employees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [CalendarEventsModule, EmployeesModule, MongooseModule.forRoot('mongodb://localhost/xlBurger'), AuthModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
