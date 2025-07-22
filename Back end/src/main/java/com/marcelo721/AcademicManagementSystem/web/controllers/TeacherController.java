package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.components.AccessChecker;
import com.marcelo721.AcademicManagementSystem.entities.Teacher;
import com.marcelo721.AcademicManagementSystem.services.TeacherService;
import com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto.TeacherCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto.TeacherResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/teachers")
@RequiredArgsConstructor
@Slf4j
public class TeacherController {
    private final TeacherService teacherService;
    private final AccessChecker checker;

    @PreAuthorize("@checker.canCreateTeacher(#dto)")//tested
    @PostMapping
    public ResponseEntity<Void> createTeacher(@RequestBody @Valid TeacherCreateDto dto) {
        teacherService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')or hasRole('TEACHER') or hasRole('EMPLOYEE')")//tested
    @GetMapping("/{id}")
    public ResponseEntity<TeacherResponseDto> findById(@PathVariable Long id) {
        Teacher obj = teacherService.findById(id);
        return ResponseEntity.ok(TeacherResponseDto.toDto(obj));
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @GetMapping()
    public ResponseEntity<List<TeacherResponseDto>> getAll() {
        List<Teacher> teachers = teacherService.findAll();
        return ResponseEntity.ok(TeacherResponseDto.toListDto(teachers));
    }

    @GetMapping("/department-teachers/{departmentId}")
    @PreAuthorize("@checker.verifyAccess(#departmentId)")
    public ResponseEntity<List<TeacherResponseDto>> getAllByDepartmentId(@PathVariable Long departmentId) {
        List<Teacher> teachers = teacherService.findAllByDepartmentId(departmentId);
        return ResponseEntity.ok(TeacherResponseDto.toListDto(teachers));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        teacherService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
