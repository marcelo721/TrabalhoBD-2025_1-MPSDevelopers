package com.marcelo721.AcademicManagementSystem.web.dto.subjectDto;

import com.marcelo721.AcademicManagementSystem.entities.Enums.TypeSubject;

public record SubjectCourseResponseDto(
        Long code,
        String name,
        Integer credits,
        TypeSubject typeSubject
) {
}
