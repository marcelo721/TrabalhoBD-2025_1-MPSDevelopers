package com.marcelo721.AcademicManagementSystem.components;


import com.marcelo721.AcademicManagementSystem.entities.*;
import com.marcelo721.AcademicManagementSystem.repositories.*;
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
    private final CourseRepository courseRepository;
    private final DepartmentRepository departmentRepository;
    private final TeacherRepository teacherRepository;

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

    public boolean verifyAccessToEmployee(Long courseId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();


        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) return true;

        Course course = courseRepository.findById(courseId).get();
        Department department = departmentRepository.findById(course.getDepartment().getCode()).get();
        Employee employee = employeeRepository.findByUserLogin(login).get();
        if(employee.getDepartment().getCode() == department.getCode()){
            return true;
        }else {
            return false;
        }
    }

    public boolean verifyAccessToEmployeeFindTeacherById(Long teacherId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();


        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) return true;

        Teacher teacher = teacherRepository.findById(teacherId).get();
        Department department = departmentRepository.findById(teacher.getDepartment().getCode()).get();
        Employee employee = employeeRepository.findByUserLogin(login).get();
        if(employee.getDepartment().getCode() == department.getCode()){
            return true;
        }else {
            return false;
        }
    }
}

