package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    Optional<Teacher> findByUserId(Long userId);

}
