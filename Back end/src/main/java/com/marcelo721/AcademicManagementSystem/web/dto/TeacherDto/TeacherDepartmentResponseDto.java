package com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto;

import java.time.LocalDate;

public record TeacherDepartmentResponseDto(
        String name,
        Long id,
        LocalDate hireDate
) {
}
