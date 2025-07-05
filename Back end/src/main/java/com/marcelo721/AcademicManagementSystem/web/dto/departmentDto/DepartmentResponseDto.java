package com.marcelo721.AcademicManagementSystem.web.dto.departmentDto;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.entities.Teacher;

import java.util.ArrayList;
import java.util.List;

public record DepartmentResponseDto(
        String name,
        List<Teacher> teachers,
        List<Course> courses,
        Long code
        ) {

    public static DepartmentResponseDto toDto(Department department) {
        return new DepartmentResponseDto(department.getName(), department.getTeachers(), department.getCourses(), department.getCode());
    }

    public static List<DepartmentResponseDto> toListDto(List<Department> departments) {
        List<DepartmentResponseDto> dtos = new ArrayList<>();
        for (Department department : departments) {
            dtos.add(toDto(department));
        }
        return dtos;
    }
}
