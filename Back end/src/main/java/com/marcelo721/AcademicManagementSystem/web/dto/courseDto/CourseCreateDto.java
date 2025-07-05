package com.marcelo721.AcademicManagementSystem.web.dto.courseDto;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CourseCreateDto(
        @NotBlank
        String name,

        @NotNull
        Integer minCredits,

        @NotNull
        Long departmentId
) {

    public Course toCourse() {
        Course course = new Course();
        course.setName(name);
        course.setMinCredits(minCredits);
        return course;
    }
}
