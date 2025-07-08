package com.marcelo721.AcademicManagementSystem.web.dto.subjectDto;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.entities.Enums.TypeSubject;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import com.marcelo721.AcademicManagementSystem.entities.Teacher;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public record SubjectResponseDto(

        Long code,
        String name,
        Integer credits,
        String syllabus,
        Course course,
        TypeSubject typeSubject,
        Set<Subject> prerequisites,
        Set<Subject> dependentSubjects,
        List<Teacher> teachers
) {

    public static SubjectResponseDto toDto(Subject obj) {
        return new SubjectResponseDto(obj.getCode(), obj.getName(), obj.getCredits(),
                obj.getSyllabus(), obj.getCourse(), obj.getTypeSubject(), obj.getPrerequisites(),
                obj.getDependentSubjects(), obj.getTeachers());
    }

    public static List<SubjectResponseDto> toListDto(List<Subject> obj) {
        final List<SubjectResponseDto> dtos = new ArrayList<>();
        for (Subject subjects : obj) {
            dtos.add(toDto(subjects));
        }
        return dtos;
    }
}
