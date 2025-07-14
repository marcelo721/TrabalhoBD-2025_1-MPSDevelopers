package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.services.DepartmentService;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.departmentDto.DepartmentCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.departmentDto.DepartmentResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/departments")
@RequiredArgsConstructor
@Slf4j
public class DepartmentController {

    private final DepartmentService departmentService;

    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody @Valid DepartmentCreateDto department) {
        Department obj = department.toDepartment();
        departmentService.save(obj);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentResponseDto> findById(@PathVariable Long id) {
        Department obj = departmentService.getDepartmentById(id);
        return ResponseEntity.ok(DepartmentResponseDto.toDto(obj));
    }

    @GetMapping()
    public ResponseEntity<List<DepartmentResponseDto>> getAll() {
        List<Department> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(DepartmentResponseDto.toListDto(departments));
    }

    @GetMapping("/department-courses/{code}")
    public ResponseEntity<List<CourseResponseDto>> getDepartmentCourses(@PathVariable Long code) {
        List<Course> courses = departmentService.findByDepartmentID(code);

        return ResponseEntity.ok(CourseResponseDto.toListDto(courses));
    }

    @DeleteMapping("/{departmentId}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable @Valid Long departmentId) {
        departmentService.deleteById(departmentId);
        return ResponseEntity.noContent().build();
    }
}
