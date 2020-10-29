import { Injectable, NotFoundException } from '@nestjs/common';
import { employeeList } from '../data/data';
import { Employee } from './interface/employee.interface';

@Injectable()
export class EmployeesService {

    getEmployee(id: string) {
        return employeeList.find(employee => employee.id === Number(id));
    };

    getEmployeeList(): Employee[] {
        return employeeList;
    };

    updateEmployee(id: string, employeeUpdated: Employee) {
        console.log('employeeUpdatedemployeeUpdated', employeeUpdated);
        let employeeToUpdate = employeeList.find(employee => employee.id === Number(id));
        if (!employeeToUpdate) {
            return new NotFoundException('Personne à mettre à jour!!!');
        };

        employeeToUpdate = {
            ...employeeToUpdate,
            ...employeeUpdated
        };
        const updatedEmployeeList = employeeList.map(employee => employee.id !== +id ? employee : employeeToUpdate);
        return { updatedEmployee: 1, employee: employeeToUpdate, employeeList: updatedEmployeeList };
    };

    createEmployee(newEmployee: Employee) {
        const newEmployeeList = [...employeeList, newEmployee];
        return { createdEmployee: 1, employee: newEmployee, employeeList: newEmployeeList };
    };

    deleteEmployee(id: string) {
        const employeeToDelete = employeeList.filter(employee => employee.id !== Number(id));
        return { deletedEmployee: 1, employeeList: employeeToDelete };
    };
};



// @Injectable()
// const TeamService = () => {
//     getTeamEmployeeList
// };

// const getTeamEmployeeList = (): any[] => {
//     return teamEmployeeList;
// }

// export default TeamService();
