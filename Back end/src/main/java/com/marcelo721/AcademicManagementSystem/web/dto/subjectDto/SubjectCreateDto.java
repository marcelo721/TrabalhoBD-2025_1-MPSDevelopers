package com.marcelo721.AcademicManagementSystem.web.dto.subjectDto;

import com.marcelo721.AcademicManagementSystem.entities.Enums.TypeSubject;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record SubjectCreateDto(
        @NotBlank
        String name,

        @NotNull
        Integer credits,

        @NotBlank
        String syllabus,

        @NotNull
        TypeSubject typeSubject,

        @NotNull
        Long CourseId,

        @NotNull
        List<@NotNull Long> prerequisitesId,

        @NotNull
        List<@NotNull Long> TeacherId
) {

    public Subject toEntity() {
        Subject subject = new Subject();
        subject.setName(name);
        subject.setCredits(credits);
        subject.setSyllabus(syllabus);
        subject.setTypeSubject(typeSubject);
        return subject;
    }
}
