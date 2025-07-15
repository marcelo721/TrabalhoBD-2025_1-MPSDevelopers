package com.marcelo721.AcademicManagementSystem.components;


import com.marcelo721.AcademicManagementSystem.repositories.EmployeeRepository;
import com.marcelo721.AcademicManagementSystem.web.controllers.TeacherController;
import com.marcelo721.AcademicManagementSystem.web.dto.EmployeeDto.EmployeeCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto.TeacherCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseCreateDto;
import org.springframework.security.core.Authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("checker")
@RequiredArgsConstructor
public class AccessChecker {

    private final EmployeeRepository employeeRepository;

    public boolean verifyAccess(Long departmentId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();


        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) return true;

        return employeeRepository.findByUserLogin(login)
                .map(emp -> emp.getDepartment().getCode().equals(departmentId))
                .orElse(false);
    }

    public boolean canCreateCourse(CourseCreateDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();

        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin) return true;

        return employeeRepository.findByUserLogin(login)
                .map(emp -> emp.getDepartment().getCode().equals(dto.departmentId()))
                .orElse(false);
    }

    public boolean canCreateEmployee(EmployeeCreateDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();

        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin) return true;

        return employeeRepository.findByUserLogin(login)
                .map(emp -> emp.getDepartment().getCode().equals(dto.idDepartment()))
                .orElse(false);
    }

    public boolean canCreateTeacher(TeacherCreateDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();

        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin) return true;

        return employeeRepository.findByUserLogin(login)
                .map(emp -> emp.getDepartment().getCode().equals(dto.departmentId()))
                .orElse(false);
    }
}

