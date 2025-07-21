package com.marcelo721.AcademicManagementSystem.services;

import com.marcelo721.AcademicManagementSystem.entities.*;
import com.marcelo721.AcademicManagementSystem.entities.Enums.RoleUser;
import com.marcelo721.AcademicManagementSystem.repositories.EnrollmentRepository;
import com.marcelo721.AcademicManagementSystem.repositories.StudentRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.studentDto.StudentCreateDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentService {

    private final StudentRepository studentRepository;
    private final CourseService courseService;
    private final TeacherService teacherService;
    private final EnrollmentRepository enrollmentRepository;
    private final UserService userService;
    private final EnrollmentService enrollmentService;

    @Transactional
    public void save(StudentCreateDto dto) {

        AppUser user = new AppUser();
        user.setPassword(dto.password());
        user.setRole(RoleUser.STUDENT);
        user.setLogin(dto.login());
        AppUser savedUser = userService.save(user);

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

        student.setUser(savedUser);
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

    @Transactional(readOnly = true)
    public List<Subject> findSubjectsCurrentlyEnrolledByStudent(Long code) {
        studentRepository.findById(code).orElseThrow(() -> new EntityNotFoundException("Student Not Found"));

        return enrollmentRepository.findSubjectsCurrentlyEnrolledByStudent(code);
    }

    @Transactional(readOnly = true)
    public List<Subject> findCompletedSubjectsByStudent(Long code) {
        studentRepository.findById(code).orElseThrow(() -> new EntityNotFoundException("Student Not Found"));

        return enrollmentRepository.findCompletedSubjectsByStudent(code);
    }

    @Transactional(readOnly = true)
    public Student findByUserId(Long userId) {
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with user id: " + userId));
    }

    @Transactional
    public void deleteStudentById(Long studentId) {
        Student student = findById(studentId);
        List<Enrollment> enrollmentsToDelete = new ArrayList<>(student.getEnrollments());
        Course course = student.getCourse();
        course.getStudents().remove(student);
        for (Enrollment enrollment : enrollmentsToDelete) {
            log.info("Deleting enrollment " + enrollment.getCode());
            enrollmentService.delete(enrollment.getCode());
        }
        studentRepository.delete(student);
    }

    @Transactional(readOnly = true)
    public List<Enrollment> findAllEnrollmentsByStudentId(Long idStudent) {
        findById(idStudent);

        return enrollmentRepository.findAllEnrollmentsByStudentCode(idStudent);
    }
}
