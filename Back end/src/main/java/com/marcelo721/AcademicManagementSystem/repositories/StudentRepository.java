package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.StudentPostGraduate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
