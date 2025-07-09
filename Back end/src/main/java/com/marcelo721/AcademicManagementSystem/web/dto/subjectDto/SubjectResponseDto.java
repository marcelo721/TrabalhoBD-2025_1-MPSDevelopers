package com.marcelo721.AcademicManagementSystem.web.dto.subjectDto;

import com.marcelo721.AcademicManagementSystem.entities.Enums.TypeSubject;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto.TeacherDepartmentResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseDepartmentResponseDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public record SubjectResponseDto(

        Long code,
        String name,
        Integer credits,
        String syllabus,
        CourseDepartmentResponseDto course,
        TypeSubject typeSubject,
        Set<SubjectCourseResponseDto> prerequisites,
        Set<SubjectCourseResponseDto> dependentSubjects,
        List<TeacherDepartmentResponseDto> teachers
) {

    public static SubjectResponseDto toDto(Subject obj) {

        CourseDepartmentResponseDto courseDto = new CourseDepartmentResponseDto(obj.getName(), obj.getCode());

        Set<SubjectCourseResponseDto> prerequisitesDto = obj.getPrerequisites().stream().map(
                prerequisites -> new SubjectCourseResponseDto(
                      prerequisites.getCode(),prerequisites.getName(), prerequisites.getCredits(),
                        prerequisites.getTypeSubject())).collect(Collectors.toSet());

        Set<SubjectCourseResponseDto> dependentDto = obj.getDependentSubjects().stream().map(
                dependent -> new SubjectCourseResponseDto(
                        dependent.getCode(),dependent.getName(), dependent.getCredits(),
                        dependent.getTypeSubject())).collect(Collectors.toSet());

        List<TeacherDepartmentResponseDto> teachersDto = obj.getTeachers().stream().map(
             teacher -> new TeacherDepartmentResponseDto(
                     teacher.getName(), teacher.getId(), teacher.getHireDate()
             )).toList();


        return new SubjectResponseDto(obj.getCode(), obj.getName(), obj.getCredits(),
                obj.getSyllabus(), courseDto, obj.getTypeSubject(), prerequisitesDto,
                dependentDto, teachersDto);
    }

    public static List<SubjectResponseDto> toListDto(List<Subject> obj) {
        final List<SubjectResponseDto> dtos = new ArrayList<>();
        for (Subject subjects : obj) {
            dtos.add(toDto(subjects));
        }
        return dtos;
    }
}
