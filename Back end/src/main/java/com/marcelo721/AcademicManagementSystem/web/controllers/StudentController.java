package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.User;
import com.marcelo721.AcademicManagementSystem.services.StudentService;
import com.marcelo721.AcademicManagementSystem.web.dto.studentDto.StudentCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.studentDto.StudentResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.userDto.UserCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.userDto.UserResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/students")
@RequiredArgsConstructor
@Slf4j
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody @Valid StudentCreateDto dto) {
        studentService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponseDto> findById(@PathVariable Long id) {
        Student obj = studentService.findById(id);
        return ResponseEntity.ok(StudentResponseDto.toDto(obj));
    }

    @GetMapping()
    public ResponseEntity<List<StudentResponseDto>> getAll() {
        List<Student> obj = studentService.findAll();
        return ResponseEntity.ok(StudentResponseDto.toListDto(obj));
    }
}
