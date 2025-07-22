package com.marcelo721.AcademicManagementSystem.services;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import com.marcelo721.AcademicManagementSystem.entities.Teacher;
import com.marcelo721.AcademicManagementSystem.repositories.CourseRepository;
import com.marcelo721.AcademicManagementSystem.repositories.SubjectRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.subjectDto.SubjectCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.subjectDto.SubjectUpdateDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final CourseRepository courseRepository;
    private final TeacherService teacherService;

    @Transactional
    public void save(SubjectCreateDto subjectCreateDto) {
        Course course = courseRepository.findById(subjectCreateDto.CourseId()).get();

        List<Teacher> teachers = subjectCreateDto.TeacherId().stream()
                .map(teacherService::findById)
                .toList();

        Set<Subject> prerequisites = subjectCreateDto.prerequisitesId().stream()
                .map(id -> subjectRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Prerequisite subject not found with id " + id))).collect(Collectors.toSet());


        Subject subject = subjectCreateDto.toEntity();
        subject.setCourse(course);
        subject.setTeachers(teachers);
        subject.setPrerequisites(prerequisites);
        teachers.forEach(teacher -> teacher.getSubjects().add(subject));

        subjectRepository.save(subject);
    }

    @Transactional(readOnly = true)
    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Subject findById(Long code) {
        return subjectRepository.findById(code).
                orElseThrow(() -> new EntityNotFoundException("subject Not Found"));
    }

    private void disconnectSubject(Subject subject) {
        subject.getTeachers()
                .forEach(t -> t.getSubjects().remove(subject));

        subject.getDependentSubjects()
                .forEach(s -> s.getPrerequisites().remove(subject));

        subject.getPrerequisites().clear();
    }

    @Transactional
    public void deleteSubjectById(Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found: " + id));

        disconnectSubject(subject);
        subjectRepository.delete(subject);
    }

    @Transactional
    public void updateSubject(Long subjectCode,SubjectUpdateDto dto){
        Subject subject = findById(subjectCode);
        subject.setName(dto.name());
        subject.setCredits(dto.credits());
        subject.setSyllabus(dto.syllabus());

        subjectRepository.save(subject);
    }
}
