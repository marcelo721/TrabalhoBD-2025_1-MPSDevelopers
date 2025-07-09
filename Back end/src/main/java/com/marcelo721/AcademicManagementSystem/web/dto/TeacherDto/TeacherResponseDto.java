package com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto;

import com.marcelo721.AcademicManagementSystem.entities.Teacher;
import com.marcelo721.AcademicManagementSystem.web.dto.departmentDto.DepartmentCourseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.studentDto.StudentCourseResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.subjectDto.SubjectCourseResponseDto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public record TeacherResponseDto(
        String name,
        Long id,
        LocalDate birthDate,
        LocalDate hireDate,
        String cpf,
        List<String> emails,
        List<String> telephones,
        List<StudentCourseResponseDto> advisees,
        List<SubjectCourseResponseDto> subjects,
        DepartmentCourseDto  department

) {
    public static TeacherResponseDto toDto(Teacher teacher) {

        List<SubjectCourseResponseDto> subjectDto = teacher.getSubjects().stream().map(
                subject -> new SubjectCourseResponseDto(
                        subject.getCode(),subject.getName(), subject.getCredits(),
                        subject.getTypeSubject())).toList();

        List<StudentCourseResponseDto> studentDtos = teacher.getAdvisees().stream()
                .map(student -> new StudentCourseResponseDto(
                        student.getName(),
                        student.getId()))
                .toList();

        DepartmentCourseDto departmentDto = new DepartmentCourseDto(teacher.getDepartment().getName(), teacher.getDepartment().getCode());

        return new TeacherResponseDto(teacher.getName(), teacher.getId(),  teacher.getBirthDate()
        , teacher.getHireDate(), teacher.getCpf(), teacher.getEmails(), teacher.getTelephones(), studentDtos,
                subjectDto, departmentDto);
    }

    public static List<TeacherResponseDto> toListDto(List<Teacher> teachers) {
        return teachers.stream().map(TeacherResponseDto::toDto).collect(Collectors.toList());
    }
}
