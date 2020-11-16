import { Connection, Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { employeeList } from '../data/data';
//import { Employee } from './interface/employee.interface';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { AddEmployeeDto } from './dto/add-employee.dto';

@Injectable()
export class EmployeesService {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>
        //@InjectConnection() private connection: Connection
    ) { }

    async getEmployeeById(id: string): Promise<Employee> {
        const employee = await this.employeeModel.findById(id).exec();
        return employee;
    }

    async getEmployeeList(): Promise<Employee[]> {
        console.log('EmployeeEmployee', Employee);
        return this.employeeModel.find().exec();
    }

    async updateEmployee(id: string, addEmployeeDto: AddEmployeeDto): Promise<any> {
        return await this.employeeModel.findByIdAndUpdate(id, addEmployeeDto, { new: true });
    }

    async addEmployee(addEmployeeDto: AddEmployeeDto): Promise<Employee> {
        const addEmployee = new this.employeeModel(addEmployeeDto);
        return addEmployee.save();
    }

    async deleteEmployee(id: string): Promise<any> {
        return await this.employeeModel.findByIdAndRemove(id);
    }
    // getEmployee(id: string) {
    //     return employeeList.find(employee => employee.id === Number(id));
    // };

    // getEmployeeList(): Employee[] {
    //     return employeeList;
    // };

    // updateEmployee(id: string, employeeUpdated: Employee) {
    //     console.log('employeeUpdatedemployeeUpdated', employeeUpdated);
    //     let employeeToUpdate = employeeList.find(employee => employee.id === Number(id));
    //     if (!employeeToUpdate) {
    //         return new NotFoundException('Personne à mettre à jour!!!');
    //     };

    //     employeeToUpdate = {
    //         ...employeeToUpdate,
    //         ...employeeUpdated
    //     };
    //     const updatedEmployeeList = employeeList.map(employee => employee.id !== +id ? employee : employeeToUpdate);
    //     return { updatedEmployee: 1, employee: employeeToUpdate, employeeList: updatedEmployeeList };
    // };

    // createEmployee(newEmployee: Employee) {
    //     const newEmployeeList = [...employeeList, newEmployee];
    //     return { createdEmployee: 1, employee: newEmployee, employeeList: newEmployeeList };
    // };

    // deleteEmployee(id: string) {
    //     const employeeToDelete = employeeList.filter(employee => employee.id !== Number(id));
    //     return { deletedEmployee: 1, employeeList: employeeToDelete };
    // };
};



// @Injectable()
// const TeamService = () => {
//     getTeamEmployeeList
// };

// const getTeamEmployeeList = (): any[] => {
//     return teamEmployeeList;
// }

// export default TeamService();
