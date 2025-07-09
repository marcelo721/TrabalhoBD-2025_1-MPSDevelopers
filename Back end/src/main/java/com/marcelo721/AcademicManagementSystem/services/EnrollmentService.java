package com.marcelo721.AcademicManagementSystem.services;

import com.marcelo721.AcademicManagementSystem.entities.Enrollment;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.StudentPostGraduate;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import com.marcelo721.AcademicManagementSystem.repositories.EnrollmentRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.enrollmentDto.EnrollmentCreateDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentService studentService;
    private final SubjectService subjectService;

    @Transactional
    public void save(EnrollmentCreateDto dto){
        Enrollment enrollment = new Enrollment();

        Student student = studentService.findById(dto.studentId());
        enrollment.setStudent(student);

        Subject subject = subjectService.findById(dto.subjectId());
        enrollment.setSubject(subject);

        enrollmentRepository.save(enrollment);
    }

    @Transactional(readOnly = true)
    public List<Enrollment> findAll() {
        return enrollmentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Enrollment findById(Long code) {
        return enrollmentRepository.findById(code).
                orElseThrow(() -> new EntityNotFoundException("enrollment Not Found"));
    }
}
