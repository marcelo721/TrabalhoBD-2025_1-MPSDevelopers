package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Enrollment;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    @Query(value = "SELECT s.* FROM subject s JOIN enrollment e ON s.code = e.subject_code WHERE e.student_code = :studentId AND e.status_enrollment = 'IN_PROGRESS'", nativeQuery = true)
    List<Subject> findSubjectsCurrentlyEnrolledByStudent(@Param("studentId") Long studentId);

    @Query(value = "SELECT s.* FROM subject s JOIN enrollment e ON s.code = e.subject_code WHERE e.student_code = :studentId AND e.status_enrollment = 'FINISHED'", nativeQuery = true)
    List<Subject> findCompletedSubjectsByStudent(@Param("studentId") Long studentId);


    @Query(value = "SELECT s.* FROM subject s JOIN enrollment e ON s.code = e.subject_code WHERE e.student_code = :studentId", nativeQuery = true)
    List<Enrollment> findAllEnrollmentsByStudentCode(Long idStudent);

    boolean existsEnrollmentByStudentIdAndSubjectCode(Long studentCode, Long subjectCode);
}
