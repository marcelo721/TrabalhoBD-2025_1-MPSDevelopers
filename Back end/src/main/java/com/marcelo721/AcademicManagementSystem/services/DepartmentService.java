package com.marcelo721.AcademicManagementSystem.services;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.repositories.CourseRepository;
import com.marcelo721.AcademicManagementSystem.repositories.DepartmentRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.departmentDto.DepartmentUpdateDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final CourseRepository courseRepository;

    @Transactional(readOnly = true)
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Department getDepartmentById(Long code) {
        return departmentRepository.findById(code).
                orElseThrow(() -> new EntityNotFoundException("Department not found"));
    }

    @Transactional
    public Department save(Department department) {
        return departmentRepository.save(department);
    }

    @Transactional(readOnly = true)
    public List<Course> findByDepartmentID(Long departmentID) {
        departmentRepository.findById(departmentID).orElseThrow(() -> new EntityNotFoundException("Department not found"));
        return courseRepository.findByDepartment(departmentID);
    }

    @Transactional
    public void deleteById(Long departmentID) {
        departmentRepository.findById(departmentID).orElseThrow(() -> new EntityNotFoundException("Department not found"));
        departmentRepository.deleteById(departmentID);
    }

    @Transactional
    public void updateDepartment(Long idDepartment, DepartmentUpdateDto dto){
        Department department = getDepartmentById(idDepartment);
        department.setName(dto.newName());
        departmentRepository.save(department);
    }
}
