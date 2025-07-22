package com.marcelo721.AcademicManagementSystem.web.dto.subjectDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record SubjectUpdateDto(
        @NotBlank
        String name,

        @NotNull
        Integer credits,

        @NotBlank
        String syllabus
) {
}
