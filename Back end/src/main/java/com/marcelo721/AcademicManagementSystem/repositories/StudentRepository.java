package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByUserId(Long userId);

    List<Student> findByCourseCode(Long courseCode);

    @Query(value = "SELECT s.* FROM student s " +
            "WHERE s.course_code = :courseCode " +
            "AND NOT EXISTS (" +
            "    SELECT subj.code FROM subject subj " +
            "    WHERE subj.course_code = :courseCode " +
            "    AND subj.type_subject = 'OBLIGATORY' " +
            "    AND NOT EXISTS (" +
            "        SELECT e.code FROM enrollment e " +
            "        WHERE e.student_code = s.code " +
            "        AND e.subject_code = subj.code " +
            "        AND e.status_enrollment = 'FINISHED'" +
            "    )" +
            ")", nativeQuery = true)
    List<Student> findStudentsWhoCompletedAllMandatorySubjects(@Param("courseCode") Long courseCode);

    @Query(value = "SELECT s.* FROM student s " +
            "WHERE s.course_code = :courseCode " +
            "AND NOT EXISTS (" +
            "    SELECT e.code FROM enrollment e " +
            "    JOIN subject subj ON e.subject_code = subj.code " +
            "    WHERE e.student_code = s.code " +
            "    AND subj.type_subject = 'OPTIONAL' " +
            "    AND subj.course_code = :courseCode" +
            ")", nativeQuery = true)
    List<Student> findStudentsWhoDidNotTakeAnyOptionalSubjects(@Param("courseCode") Long courseCode);

}
