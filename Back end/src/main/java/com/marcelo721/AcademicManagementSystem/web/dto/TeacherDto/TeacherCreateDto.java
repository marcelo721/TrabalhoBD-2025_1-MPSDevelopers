package com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto;

import com.marcelo721.AcademicManagementSystem.entities.Teacher;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;
import java.util.List;

public record TeacherCreateDto(

        @NotBlank
        String name,

        @NotNull
        @Past(message = "A data deve ser anterior à data atual")
        LocalDate birthDate,

        @NotNull
        @Past(message = "A data deve ser anterior à data atual")
        LocalDate hireDate,

        @NotNull
        @CPF
        String cpf,

        @NotNull
        @Size(min = 1, message = "Informe pelo menos um e-mail")
        List<@Email(message = "E-mail inválido") String> emails,


        @NotNull
        @Size(min = 1, message = "Informe pelo menos um telefone")
        @Valid
        List<PhoneDto> phones,

        @NotNull
        Long departmentId,

        @NotBlank
        String password,

        @NotBlank
        String login
) {

    public Teacher toTeacher() {
        Teacher teacher = new Teacher();
        teacher.setName(name);
        teacher.setBirthDate(birthDate);
        teacher.setHireDate(hireDate);
        teacher.setCpf(cpf);
        // extração dos valores de PhoneDto para String
        teacher.setTelephones(phones.stream().map(PhoneDto::number).toList());
        teacher.setEmails(emails);
        return teacher;
    }
}
