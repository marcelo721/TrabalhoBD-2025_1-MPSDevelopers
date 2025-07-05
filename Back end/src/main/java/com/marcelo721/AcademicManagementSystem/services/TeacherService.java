package com.marcelo721.AcademicManagementSystem.services;

import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.entities.Teacher;
import com.marcelo721.AcademicManagementSystem.repositories.TeacherRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto.TeacherCreateDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final DepartmentService departmentService;

    @Transactional(readOnly = true)
    public List<Teacher> findAll() {
        return teacherRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Teacher findById(Long code) {
        return teacherRepository.findById(code).
                orElseThrow(() -> new EntityNotFoundException("teacher Not Found"));
    }

    @Transactional
    public Teacher save(TeacherCreateDto teacher) {
        Teacher obj = teacher.toTeacher();
        Department department = departmentService.getDepartmentById(teacher.departmentId());
        obj.setDepartment(department);
        return teacherRepository.save(obj);
    }
}
