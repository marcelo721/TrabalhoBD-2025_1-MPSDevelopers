package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Enrollment;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
// Herda todos os métodos CRUD (findAll, findById, save, delete etc.), responsável por se comunicar com o banco de dados
@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    // filtra todas as matriculas que ainda estão em progresso
    @Query(value = "SELECT s.* FROM subject s JOIN enrollment e ON s.code = e.subject_code WHERE e.student_code = :studentId AND e.status_enrollment = 'IN_PROGRESS'", nativeQuery = true)
    List<Subject> findSubjectsCurrentlyEnrolledByStudent(@Param("studentId") Long studentId);

    // filtra todas as matriculas que estão finalizadas
    @Query(value = "SELECT s.* FROM subject s JOIN enrollment e ON s.code = e.subject_code WHERE e.student_code = :studentId AND e.status_enrollment = 'FINISHED'", nativeQuery = true)
    List<Subject> findCompletedSubjectsByStudent(@Param("studentId") Long studentId);


    // filtra todas as matriculas em disciplina a partir do código do estudante
    @Query(value = "SELECT s.* FROM subject s JOIN enrollment e ON s.code = e.subject_code WHERE e.student_code = :studentId", nativeQuery = true)
    List<Enrollment> findAllEnrollmentsByStudentCode(Long idStudent);

    // método que verifica se o estudante já está matriculado em uma certa disciplina
    boolean existsEnrollmentByStudentIdAndSubjectCode(Long studentCode, Long subjectCode);

    List<Enrollment> findAllBySubjectCode(Long idSubject);
}
