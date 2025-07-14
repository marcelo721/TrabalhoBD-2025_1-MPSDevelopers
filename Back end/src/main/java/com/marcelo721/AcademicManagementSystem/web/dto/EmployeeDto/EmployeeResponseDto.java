package com.marcelo721.AcademicManagementSystem.web.dto.EmployeeDto;

import com.marcelo721.AcademicManagementSystem.entities.Employee;
import com.marcelo721.AcademicManagementSystem.web.dto.departmentDto.DepartmentCourseDto;

import java.util.ArrayList;
import java.util.List;

public record EmployeeResponseDto(

        String name,
        DepartmentCourseDto department
) {

    public static EmployeeResponseDto toDto(Employee employee) {

        DepartmentCourseDto  department = new DepartmentCourseDto(employee.getDepartment().getName(),employee.getDepartment().getCode());
        return new EmployeeResponseDto(employee.getName(),department);
    }

    public static List<EmployeeResponseDto> toListDto(List<Employee> employees) {

        List<EmployeeResponseDto> employeeResponseDtos = new ArrayList<>();
        for (Employee employee : employees) {
            employeeResponseDtos.add(toDto(employee));
        }
        return employeeResponseDtos;
    }
}
