package com.marcelo721.AcademicManagementSystem.web.dto.courseDto;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.web.dto.departmentDto.DepartmentCourseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.studentDto.StudentCourseResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.subjectDto.SubjectCourseResponseDto;

import java.util.List;
import java.util.stream.Collectors;

public record CourseResponseDto(
        String name,
        Long code,
        Integer minCredits,
        List<StudentCourseResponseDto> students,
        List<SubjectCourseResponseDto> subjects,
        DepartmentCourseDto department
) {

    public static CourseResponseDto toDto(Course course) {

        DepartmentCourseDto departmentCourse = new DepartmentCourseDto(course.getDepartment().getName(), course.getCode());

        List<StudentCourseResponseDto> studentDtos = course.getStudents().stream()
                .map(student -> new StudentCourseResponseDto(
                        student.getName(),
                        student.getId()))
                .collect(Collectors.toList());

        List<SubjectCourseResponseDto> subjectDtos = course.getSubjects().stream()
                .map(subject -> new SubjectCourseResponseDto(
                        subject.getCode(),
                        subject.getName(),
                        subject.getCredits(),
                        subject.getTypeSubject()))
                .collect(Collectors.toList());

        return new CourseResponseDto(
                course.getName(),
                course.getCode(),
                course.getMinCredits(),
                studentDtos,
                subjectDtos,
                departmentCourse
        );
    }

    public static List<CourseResponseDto> toListDto(List<Course> courses) {
        return courses.stream().map(CourseResponseDto::toDto).collect(Collectors.toList());
    }
}
