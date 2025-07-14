package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

    @Query(value = "select s.* from subject s JOIN course c ON s.course_code = c.code where :codeCourse = c.code AND s.type_subject = 'OBLIGATORY'", nativeQuery = true)
    List<Subject> findObligatorySubjectsByCourseCode(Long codeCourse);

    @Query(value = "select s.* from subject s JOIN course c ON s.course_code = c.code where :codeCourse = c.code AND s.type_subject = 'OPTIONAL'", nativeQuery = true)
    List<Subject> findOptionalSubjectsByCourseCode(Long codeCourse);
}
