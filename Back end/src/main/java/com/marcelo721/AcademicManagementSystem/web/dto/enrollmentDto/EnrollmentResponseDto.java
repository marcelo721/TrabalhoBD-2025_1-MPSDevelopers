package com.marcelo721.AcademicManagementSystem.web.dto.enrollmentDto;

import com.marcelo721.AcademicManagementSystem.entities.Enrollment;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Subject;

import java.util.List;
import java.util.stream.Collectors;

public record EnrollmentResponseDto(
        Student student,
        Subject subject,
        Float finalGrade,
        Float attendance
) {

    public static EnrollmentResponseDto toDto(Enrollment enrollment) {
        return new EnrollmentResponseDto(enrollment.getStudent(), enrollment.getSubject(),
                enrollment.getFinalGrade(), enrollment.getAttendance());
    }

    public static List<EnrollmentResponseDto> toListDto(List<Enrollment> enrollments) {
        return enrollments.stream().map(EnrollmentResponseDto::toDto).collect(Collectors.toList());
    }
}
