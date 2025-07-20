package com.marcelo721.AcademicManagementSystem.web.dto.studentDto;

import com.marcelo721.AcademicManagementSystem.entities.*;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public record StudentResponseDto(
        Long code,
        String name,
        String address,
        LocalDate admissionYear,
        List<String> previousCourses,
        Long advisorId,
        String advisorName,
        String courseName,
        List<String> subjectsName,
        List<PhoneDto> phones
) {

    // DTO para Phone para evitar recursão
    public record PhoneDto( String number, String description) {
        public static PhoneDto fromEntity(Phone phone) {
            return new PhoneDto(phone.getNumber(), phone.getDescription());
        }
    }

    // Método factory para criar DTO a partir de qualquer Student
    public static StudentResponseDto fromStudent(Student student) {
        List<String> subjectsName = student.getEnrollments().stream()
                .map(enrollment -> enrollment.getSubject().getName())
                .collect(Collectors.toList());

        List<PhoneDto> phoneDtos = student.getTelephones().stream()
                .map(PhoneDto::fromEntity)
                .collect(Collectors.toList());

        LocalDate admissionYear = null;
        List<String> previousCourses = null;
        Long advisorId = null;
        String advisorName = null;

        if (student instanceof StudentUndergraduate) {
            admissionYear = ((StudentUndergraduate) student).getAdmissionYear();
        } else if (student instanceof StudentPostGraduate) {
            StudentPostGraduate pg = (StudentPostGraduate) student;
            previousCourses = pg.getPreviousCourses();
            if (pg.getAdvisor() != null) {
                advisorId = pg.getAdvisor().getId();
                advisorName = pg.getAdvisor().getName();
            }
        }

        return new StudentResponseDto(
                student.getId(),
                student.getName(),
                student.getAddress(),
                admissionYear,
                previousCourses,
                advisorId,
                advisorName,
                student.getCourse().getName(),
                subjectsName,
                phoneDtos
        );
    }

    // Método para converter lista de Students
    public static List<StudentResponseDto> fromStudents(List<Student> students) {
        return students.stream()
                .map(StudentResponseDto::fromStudent)
                .collect(Collectors.toList());
    }
}