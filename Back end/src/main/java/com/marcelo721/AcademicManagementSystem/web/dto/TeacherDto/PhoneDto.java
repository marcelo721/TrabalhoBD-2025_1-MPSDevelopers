package com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record PhoneDto(
        @NotBlank(message = "O telefone não pode estar em branco")
        @Pattern(
                regexp = "^\\(?(\\d{2})\\)?[\\s-]?(\\d{4,5})[\\s-]?(\\d{4})$",
                message = "Telefone inválido. Use (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX"
        )
        String number
) {
}
