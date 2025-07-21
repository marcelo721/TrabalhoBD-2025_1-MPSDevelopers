package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
//Herda todos os métodos CRUD (findAll, findById, save, delete etc.), responsável por se comunicar com o banco de dados
public interface SubjectRepository extends JpaRepository<Subject, Long> {

    // encontra todas as disciplinas obrigatórias de um curso
    @Query(value = "select s.* from subject s JOIN course c ON s.course_code = c.code where :codeCourse = c.code AND s.type_subject = 'OBLIGATORY'", nativeQuery = true)
    List<Subject> findObligatorySubjectsByCourseCode(Long codeCourse);

    // encontra todas as disciplinas opcionais de um curso
    @Query(value = "select s.* from subject s JOIN course c ON s.course_code = c.code where :codeCourse = c.code AND s.type_subject = 'OPTIONAL'", nativeQuery = true)
    List<Subject> findOptionalSubjectsByCourseCode(Long codeCourse);

    // acha uma disciplina pelo código do professor
    List<Subject> findByTeachersId(Long teacherId);
}
