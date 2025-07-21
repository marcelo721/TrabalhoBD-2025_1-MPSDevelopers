package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
//Herda todos os métodos CRUD (findAll, findById, save, delete etc.), responsável por se comunicar com o banco de dados
@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    // encontra um professor pelo id do user associado
    Optional<Teacher> findByUserId(Long userId);

    // encontra todos os professores pelo código do departamento
    List<Teacher> findAllByDepartmentCode(Long departmentCode);
}
