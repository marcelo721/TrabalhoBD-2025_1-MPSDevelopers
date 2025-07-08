package com.marcelo721.AcademicManagementSystem.web.dto.studentDto;

import com.marcelo721.AcademicManagementSystem.entities.Enums.TypeStudent;
import com.marcelo721.AcademicManagementSystem.entities.Phone;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record StudentCreateDto(
        @NotBlank
        String name,

        @NotNull
        TypeStudent typeStudent,

        @NotNull
        LocalDate admissionYear,

        @NotBlank
        String address,

        @NotNull
        Long courseCode,

        Long teacherCode,

        @NotNull
        List<@NotBlank String> previousCourses,

        @NotNull
        List<Phone> phones
){
    public Student toEntity() {
        Student student = new Student();
        student.setName(name);
        student.setTypeStudent(typeStudent);
        student.setAdmissionYear(admissionYear);
        student.setPreviousCourses(previousCourses);
        student.setAddress(address);
        phones.forEach(p -> p.setStudentPhone(student));
        student.setTelephones(phones);
        return student;
    }
}
