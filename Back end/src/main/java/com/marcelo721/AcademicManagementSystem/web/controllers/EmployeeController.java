package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.Employee;
import com.marcelo721.AcademicManagementSystem.services.EmployeeService;
import com.marcelo721.AcademicManagementSystem.web.dto.EmployeeDto.EmployeeCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.EmployeeDto.EmployeeResponseDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/employees")
@RequiredArgsConstructor
@Slf4j
public class EmployeeController {

    private final EmployeeService employeeService;

    @PreAuthorize("@checker.canCreateEmployee(#dto)")//tested
    @PostMapping
    public ResponseEntity<Void> CreateEmployee(@RequestBody @Valid EmployeeCreateDto dto) {
        employeeService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> findById(@PathVariable Long id) {
        Employee employee = employeeService.findById(id);
        return ResponseEntity.ok(EmployeeResponseDto.toDto(employee));
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @GetMapping()
    public ResponseEntity<List<EmployeeResponseDto>> getAll() {
        List<Employee> dto = employeeService.findAll();
        return ResponseEntity.ok(EmployeeResponseDto.toListDto(dto));
    }

    @GetMapping("/department-employees/{departmentId}")
    @PreAuthorize("@checker.verifyAccess(#departmentId)")//tested
    public ResponseEntity<List<EmployeeResponseDto>> getAllEmployeesByDepartment(@PathVariable Long departmentId) {
        List<Employee> employees = employeeService.findAllByDepartmentCode(departmentId);
        return ResponseEntity.ok(EmployeeResponseDto.toListDto(employees));
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @DeleteMapping("{EmployeeId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long EmployeeId) {
        employeeService.deleteById(EmployeeId);
        return ResponseEntity.noContent().build();
    }
}
