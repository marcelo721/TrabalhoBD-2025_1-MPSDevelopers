package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Employee;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.nio.channels.FileChannel;
import java.util.List;
import java.util.Optional;
// Herda todos os métodos CRUD (findAll, findById, save, delete etc.), responsável por se comunicar com o banco de dados
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // método responsável por encontrar um empregado pelo id do user
    Optional<Employee> findByUserId(Long userId);

    // método responsável por encontrar um empregado pelo login do user
    Optional<Employee> findByUserLogin(String username);

    // método para encontrar todos os empregado de um departamento
    List<Employee> findAllByDepartmentCode(Long departmentId);

}
