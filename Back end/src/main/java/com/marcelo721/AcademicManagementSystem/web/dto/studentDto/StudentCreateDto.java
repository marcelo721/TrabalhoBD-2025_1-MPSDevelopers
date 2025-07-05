package com.marcelo721.AcademicManagementSystem.web.dto.studentDto;

import com.marcelo721.AcademicManagementSystem.entities.Enums.TypeStudent;
import com.marcelo721.AcademicManagementSystem.entities.Phone;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record StudentCreateDto (
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

       @NotBlank
       List<String> previousCourses,

       @NotNull
       List<Phone> phone
){
       public Student toEntity() {
              Student student = new Student();
              student.setName(name);
              student.setTypeStudent(typeStudent);
              student.setAdmissionYear(admissionYear);
              student.setAddress(address);
              student.setPreviousCourses(previousCourses);
              student.setTelephones(phone);
              return student;
       }
}
