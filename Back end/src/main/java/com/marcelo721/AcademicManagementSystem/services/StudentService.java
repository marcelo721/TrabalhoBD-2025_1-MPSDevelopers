package com.marcelo721.AcademicManagementSystem.services;

import com.marcelo721.AcademicManagementSystem.entities.*;
import com.marcelo721.AcademicManagementSystem.repositories.StudentRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.studentDto.StudentCreateDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final CourseService courseService;
    private final TeacherService teacherService;

    @Transactional
    public void save(StudentCreateDto dto) {
        Student student = new Student();

        Course course = courseService.findById(dto.courseCode());

        if (dto.admissionYear() != null) {
            // Aluno de graduação
            StudentUndergraduate undergraduate = new StudentUndergraduate();
            undergraduate.setName(dto.name());
            undergraduate.setAddress(dto.address());
            undergraduate.setCourse(course);
            undergraduate.setAdmissionYear(dto.admissionYear());
            dto.phones().forEach(phone -> phone.setStudentPhone(undergraduate));
            undergraduate.setTelephones(dto.phones());
            student = undergraduate;

        } else {
            // Aluno de pós-graduação
            StudentPostGraduate postGraduate = new StudentPostGraduate();
            postGraduate.setName(dto.name());
            postGraduate.setCourse(course); // <-- e aqui também!
            postGraduate.setAddress(dto.address());
            postGraduate.setPreviousCourses(dto.previousCourses() != null ? dto.previousCourses() : List.of());
            dto.phones().forEach(phone -> phone.setStudentPhone(postGraduate));
            postGraduate.setTelephones(dto.phones());

            // Busca e define o orientador
            if (dto.advisorId() != null) {
                Teacher advisor = teacherService.findById(dto.advisorId());
                postGraduate.setAdvisor(advisor);
            }

            student = postGraduate;
        }

        studentRepository.save(student);
    }


    @Transactional(readOnly = true)
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Student findById(long code) {
            return studentRepository.findById(code).
                    orElseThrow(() -> new EntityNotFoundException("Student Not Found"));
    }

    @Transactional
    public void delete(long code) {
        studentRepository.deleteById(code);
    }
}
