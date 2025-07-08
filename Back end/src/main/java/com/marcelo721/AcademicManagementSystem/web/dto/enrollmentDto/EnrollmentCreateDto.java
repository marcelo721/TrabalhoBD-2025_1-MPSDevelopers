package com.marcelo721.AcademicManagementSystem.web.dto.enrollmentDto;

import com.marcelo721.AcademicManagementSystem.entities.Enrollment;
import jakarta.validation.constraints.NotNull;

public record EnrollmentCreateDto(
        @NotNull
        Long studentId,

        @NotNull
        Long subjectId
){
}
