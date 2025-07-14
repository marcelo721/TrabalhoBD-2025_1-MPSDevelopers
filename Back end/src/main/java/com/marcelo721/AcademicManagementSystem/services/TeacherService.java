package com.marcelo721.AcademicManagementSystem.services;

import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.entities.Enums.RoleUser;
import com.marcelo721.AcademicManagementSystem.entities.Student;
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
    private final UserService userService;

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
    public void save(TeacherCreateDto teacher) {

        AppUser user = new AppUser();
        user.setPassword(teacher.password());
        user.setRole(RoleUser.TEACHER);
        user.setLogin(teacher.login());
        AppUser savedUser = userService.save(user);

        Teacher obj = teacher.toTeacher();
        Department department = departmentService.getDepartmentById(teacher.departmentId());
        obj.setDepartment(department);
        obj.setUser(user);
        teacherRepository.save(obj);
    }

    @Transactional(readOnly = true)
    public Teacher findByUserId(Long userId) {
        return teacherRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Teacher not found with user id: " + userId));
    }



}
