import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [EmployeesModule, MongooseModule.forRoot('mongodb://localhost/xlBurger')],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
