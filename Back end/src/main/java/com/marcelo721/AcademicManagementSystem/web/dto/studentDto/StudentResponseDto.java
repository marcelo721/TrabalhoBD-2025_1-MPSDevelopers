package com.marcelo721.AcademicManagementSystem.web.dto.studentDto;

import com.marcelo721.AcademicManagementSystem.entities.Enrollment;
import com.marcelo721.AcademicManagementSystem.entities.Enums.TypeStudent;
import com.marcelo721.AcademicManagementSystem.entities.Phone;
import com.marcelo721.AcademicManagementSystem.entities.Student;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public record StudentResponseDto(
        String name,
        TypeStudent student,
        LocalDate admissionYear,
        List<Phone> phones,
        List<String> previousCourses,
        String address,
        String courseName,
        List<String> subjectsName
) {

    public static StudentResponseDto toDto(Student student) {

        List<String> subjectsName = new ArrayList<>();
        for (Enrollment enrollment : student.getEnrollments()) {
            subjectsName.add(enrollment.getSubject().getName());
        }

        StudentResponseDto dto = new StudentResponseDto(
                student.getName(), student.getTypeStudent(),student.getAdmissionYear(),student.getTelephones(),
                student.getPreviousCourses(), student.getAddress(),student.getCourse().getName(),subjectsName
        );
        return dto;
    }

    public static List<StudentResponseDto> toListDto(List<Student> students) {
        List<StudentResponseDto> dtos = new ArrayList<>();
        for (Student student : students) {
            dtos.add(toDto(student));
        }
        return dtos;
    }
}
