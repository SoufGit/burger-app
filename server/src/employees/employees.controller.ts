import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './interface/employee.interface';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { };

    @Get()
    getEmployeeList(): Employee[] {
        return this.employeesService.getEmployeeList();
    };

    @Get(':id')
    getEmployee(@Param('id') id: string) {
        return this.employeesService.getEmployee(id);
    };

    @Patch(':id')
    updateEmployee(@Param('id') id: string, @Body() employeeUpdated: Employee) {
        return this.employeesService.updateEmployee(id, employeeUpdated);
    };

    @Post()
    createEmployee(@Body() newEmployee: Employee) {
        return this.employeesService.createEmployee(newEmployee);
    };

    @Delete(':id')
    deleteEmployee(@Param('id') id: string) {
        return this.employeesService.deleteEmployee(id);
    };
};
