package com.marcelo721.AcademicManagementSystem.services;

import com.marcelo721.AcademicManagementSystem.entities.Enrollment;
import com.marcelo721.AcademicManagementSystem.entities.Enums.StatusEnrollment;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import com.marcelo721.AcademicManagementSystem.repositories.EnrollmentRepository;
import com.marcelo721.AcademicManagementSystem.repositories.StudentRepository;
import com.marcelo721.AcademicManagementSystem.services.exceptions.EnrollmentAlreadyCreatedException;
import com.marcelo721.AcademicManagementSystem.web.dto.enrollmentDto.EnrollmentCreateDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final SubjectService subjectService;

    @Transactional
    public void save(EnrollmentCreateDto dto){
        Enrollment enrollment = new Enrollment();
        enrollment.setEnrollmentStatus(StatusEnrollment.IN_PROGRESS);

        Student student = studentRepository.findById(dto.studentId()).get();
        enrollment.setStudent(student);

        Subject subject = subjectService.findById(dto.subjectId());
        enrollment.setSubject(subject);

        if (!enrollmentRepository.existsEnrollmentByStudentIdAndSubjectCode(dto.studentId(), dto.subjectId())) {
            enrollmentRepository.save(enrollment);
        }else {
            throw new EnrollmentAlreadyCreatedException("Enrollment already exists");
        }
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

    @Transactional
    public void delete(Long code) {
        log.info("Deleting enrollment with code {}", code);
        Enrollment enrollment = findById(code);
        Student student = studentRepository.findById(enrollment.getStudent().getId()).get();
        Subject subject = subjectService.findById(enrollment.getSubject().getCode());
        student.getEnrollments().remove(enrollment);
        subject.getEnrollments().remove(enrollment);
        enrollmentRepository.delete(enrollment);
    }

    public List<Enrollment> findAllEnrollmentsByStudentId(Long idStudent) {
        Student student = studentRepository.findById(idStudent).orElseThrow(() -> new EntityNotFoundException("Student Not Found"));
        return student.getEnrollments();
    }
}
