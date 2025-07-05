package com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto;

import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import com.marcelo721.AcademicManagementSystem.entities.Teacher;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public record TeacherResponseDto(
        String name,
        Long id,
        LocalDate birthDate,
        LocalDate hireDate,
        String cpf,
        List<String> emails,
        List<String> telephones,
        List<Student> advisees,
        List<Subject> subjects,
        Department department

) {
    public static TeacherResponseDto toDto(Teacher teacher) {
        return new TeacherResponseDto(teacher.getName(), teacher.getId(),  teacher.getBirthDate()
        , teacher.getHireDate(), teacher.getCpf(), teacher.getEmails(), teacher.getTelephones(), teacher.getAdvisees(),
                teacher.getSubjects(), teacher.getDepartment());
    }

    public static List<TeacherResponseDto> toListDto(List<Teacher> teachers) {
        return teachers.stream().map(TeacherResponseDto::toDto).collect(Collectors.toList());
    }
}
