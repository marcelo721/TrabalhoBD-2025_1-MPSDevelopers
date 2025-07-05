package com.marcelo721.AcademicManagementSystem.web.dto.courseDto;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Subject;

import java.util.List;
import java.util.stream.Collectors;

public record CourseResponseDto(
        String name,
        Long code,
        Integer minCredits,
        List<Student> students,
        List<Subject> subjects,
        Department department
) {

    public static CourseResponseDto toDto(Course course) {
        return new CourseResponseDto(course.getName(),
                course.getCode(), course.getMinCredits(), course.getStudents(), course.getSubjects(), course.getDepartment());
    }

    public static List<CourseResponseDto> toListDto(List<Course> courses) {
        return courses.stream().map(CourseResponseDto::toDto).collect(Collectors.toList());
    }
}
