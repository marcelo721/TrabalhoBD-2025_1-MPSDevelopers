package com.marcelo721.AcademicManagementSystem.web.dto.studentDto;

import com.marcelo721.AcademicManagementSystem.entities.*;
import com.marcelo721.AcademicManagementSystem.services.TeacherService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record StudentCreateDto(
        @NotBlank String name,
        @NotBlank String address,
        @NotNull Long courseCode,
        @NotNull List<Phone> phones,

        LocalDate admissionYear,

        List<String> previousCourses,
        Long advisorId,

        @NotBlank
        String password,

        @NotBlank
        String login
) {
}
