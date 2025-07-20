package com.marcelo721.AcademicManagementSystem.components;


import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import com.marcelo721.AcademicManagementSystem.repositories.EmployeeRepository;
import com.marcelo721.AcademicManagementSystem.repositories.StudentRepository;
import com.marcelo721.AcademicManagementSystem.repositories.UserRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.EmployeeDto.EmployeeCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto.TeacherCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseCreateDto;
import org.springframework.security.core.Authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

// componente responsável por chechar acesso a rotas da API baseado no role do Usuário
@Component("checker")
@RequiredArgsConstructor
public class AccessChecker {

    private final EmployeeRepository employeeRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    // verifica se o usuário que está tentando acessar a rota tem permissão
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

    // verifica se o usuário tem a permissão para criar um curso
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

    // verifica se o usuário tem a permissão para criar um empregado
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

    // verifica se o usuário tem a permissão para criar um professor
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

    // verifica se o usuário tem a permissão para criar um aluno
    public boolean verifyAccessToStudent(Long studentId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();
        AppUser user = userRepository.findByLogin(login).get();

        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) return true;

        return studentRepository.findById(studentId)
                .map(student -> student.getUser().getId().equals(user.getId()))
                .orElse(false);
    }
}

