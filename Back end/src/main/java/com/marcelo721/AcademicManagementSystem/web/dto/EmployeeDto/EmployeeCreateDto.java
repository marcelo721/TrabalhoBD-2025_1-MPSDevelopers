package com.marcelo721.AcademicManagementSystem.web.dto.EmployeeDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmployeeCreateDto(

        @NotBlank
        String name,

        @NotNull
        Long idDepartment,

        @NotBlank
        String password,

        @NotBlank
        String login
) {
}
