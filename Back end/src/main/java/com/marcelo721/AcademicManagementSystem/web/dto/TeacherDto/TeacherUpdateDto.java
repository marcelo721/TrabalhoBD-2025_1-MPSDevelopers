package com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;
import java.util.List;

public record TeacherUpdateDto(
        @NotBlank
        String name,

        @NotNull
        @Past(message = "A data deve ser anterior à data atual")
        LocalDate birthDate,

        @NotNull
        @Past(message = "A data deve ser anterior à data atual")
        LocalDate hireDate,


        @NotNull
        @Size(min = 1, message = "Informe pelo menos um e-mail")
        List<@Email(message = "E-mail inválido") String> emails,


        @NotNull
        @Size(min = 1, message = "Informe pelo menos um telefone")
        @Valid
        List<PhoneDto> phones
) {
}
