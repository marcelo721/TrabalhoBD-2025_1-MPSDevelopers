package com.marcelo721.AcademicManagementSystem.web.dto.enrollmentDto;

import com.marcelo721.AcademicManagementSystem.entities.Enrollment;
import com.marcelo721.AcademicManagementSystem.entities.Enums.StatusEnrollment;
import com.marcelo721.AcademicManagementSystem.web.dto.studentDto.StudentCourseResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.subjectDto.SubjectCourseResponseDto;

import java.util.List;
import java.util.stream.Collectors;

public record EnrollmentResponseDto(
        StudentCourseResponseDto student,
        SubjectCourseResponseDto subject,
        Float finalGrade,
        Float attendance,
        StatusEnrollment statusEnrollment
) {

    public static EnrollmentResponseDto toDto(Enrollment enrollment) {
        SubjectCourseResponseDto subjectDto = new SubjectCourseResponseDto(enrollment.getSubject().getCode(),
                enrollment.getSubject().getName(), enrollment.getSubject().getCredits(), enrollment.getSubject().getTypeSubject());

        StudentCourseResponseDto studentDto = new StudentCourseResponseDto(enrollment.getStudent().getName(),
                enrollment.getStudent().getId());

        return new EnrollmentResponseDto(studentDto, subjectDto,
                enrollment.getFinalGrade(), enrollment.getAttendance(), enrollment.getEnrollmentStatus());
    }

    public static List<EnrollmentResponseDto> toListDto(List<Enrollment> enrollments) {
        return enrollments.stream().map(EnrollmentResponseDto::toDto).collect(Collectors.toList());
    }
}
