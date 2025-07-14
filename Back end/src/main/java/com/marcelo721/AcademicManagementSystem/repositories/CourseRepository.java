package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query(value = "select c.* FROM course c JOIN  department d ON c.department_code = d.code WHERE d.code = :codeDepartment" , nativeQuery = true)
    List<Course> findByDepartment(Long codeDepartment);
}
