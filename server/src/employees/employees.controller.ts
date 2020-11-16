import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { EmployeesService } from './employees.service';
// import { Employee } from './interface/employee.interface';
import { AddEmployeeDto } from './dto/add-employee.dto';
import { Employee } from './schemas/employee.schema';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { };

    @Get()
    async getEmployeeList(@Res() res): Promise<Employee[]> {

        const employeeList = await this.employeesService.getEmployeeList();

        if (res.statusCode === HttpStatus.OK) {
            console.log('getEmployeeListgetEmployeeListgetEmployeeList', res);
            return res.status(HttpStatus.OK).json(employeeList);
        }
    }

    @Get(':id')
    async getEmployeeById(@Res() res, @Param('id') id: string) {
        const employeeFound = await this.employeesService.getEmployeeById(id);
        if (!employeeFound) throw new NotFoundException('Id does not exist!');
        return res.status(HttpStatus.OK).json(employeeFound);
        //return this.employeesService.getEmployeeById(id);
    };

    @Patch(':id')
    updateEmployee(@Param('id') id: string, @Body() employeeUpdated: Employee) {
        return this.employeesService.updateEmployee(id, employeeUpdated);
    };

    @Post()
    async addEmployee(@Res() res, @Body() addEmployeeDto: AddEmployeeDto) {
        console.log('addEmployeeDtoaddEmployeeDto', addEmployeeDto);
        const employeeAdded = await this.employeesService.addEmployee(addEmployeeDto);
        return res.status(HttpStatus.OK).json({
            message: "Post has been added successfully",
            addedEmployee: 1,
            employee: employeeAdded
        });
        // await this.employeesService.createEmployee(createEmployeeDto);
    }

    @Delete(':id')
    deleteEmployee(@Param('id') id: string) {
        return this.employeesService.deleteEmployee(id);
    };
};
