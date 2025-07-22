package com.marcelo721.AcademicManagementSystem.web.dto.courseDto;

import jakarta.validation.constraints.NotBlank;

public record CourseUpdateDto(
        @NotBlank
        String newName
) {
}
