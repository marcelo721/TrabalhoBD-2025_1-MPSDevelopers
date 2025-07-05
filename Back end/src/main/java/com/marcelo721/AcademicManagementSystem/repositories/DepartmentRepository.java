package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
