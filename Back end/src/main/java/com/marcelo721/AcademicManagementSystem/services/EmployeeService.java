package com.marcelo721.AcademicManagementSystem.services;


import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.entities.Employee;
import com.marcelo721.AcademicManagementSystem.entities.Enums.RoleUser;
import com.marcelo721.AcademicManagementSystem.entities.Teacher;
import com.marcelo721.AcademicManagementSystem.repositories.EmployeeRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.EmployeeDto.EmployeeCreateDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final DepartmentService departmentService;
    private final UserService userService;

    @Transactional
    public void save(EmployeeCreateDto employeeDto) {

        Department department = departmentService.getDepartmentById(employeeDto.idDepartment());

        AppUser user = new AppUser();
        user.setPassword(employeeDto.password());
        user.setRole(RoleUser.EMPLOYEE);
        user.setLogin(employeeDto.login());
        AppUser savedUser = userService.save(user);

        Employee employee = new Employee();
        employee.setName(employeeDto.name());
        employee.setDepartment(department);
        employee.setUser(savedUser);
        employeeRepository.save(employee);
    }

    @Transactional(readOnly = true)
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Employee findById(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Employee not found with user id: " + id));
    }

    @Transactional(readOnly = true)
    public Employee findByUserId(Long userId) {
        return employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with user id: " + userId));
    }

    @Transactional
    public void deleteById(Long id) {
        Employee employee = findById(id);
        Department department = employee.getDepartment();

        if (department != null) {
            department.getEmployees().remove(employee);
        }

        employeeRepository.delete(employee);
    }
}
