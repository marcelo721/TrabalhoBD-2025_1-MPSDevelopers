package com.marcelo721.AcademicManagementSystem.web.dto.departmentDto;

import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto.TeacherDepartmentResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseDepartmentResponseDto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public record DepartmentResponseDto(
        String name,
        List<TeacherDepartmentResponseDto> teachers,
        List<CourseDepartmentResponseDto> courses,
        Long code
        ) {

    public static DepartmentResponseDto toDto(Department department) {
        List<TeacherDepartmentResponseDto> departments = department.getTeachers().stream().
                        map(teacher -> new TeacherDepartmentResponseDto
                                (teacher.getName(), teacher.getId(), teacher.getHireDate())).collect(Collectors.toList());


        List<CourseDepartmentResponseDto> courses = department.getCourses().stream().
                map(course -> new CourseDepartmentResponseDto
                        (course.getName(), course.getCode())).collect(Collectors.toList());

        
        return new DepartmentResponseDto(department.getName(), departments,courses, department.getCode());
    }

    public static List<DepartmentResponseDto> toListDto(List<Department> departments) {
        List<DepartmentResponseDto> dtos = new ArrayList<>();
        for (Department department : departments) {
            dtos.add(toDto(department));
        }
        return dtos;
    }
}
