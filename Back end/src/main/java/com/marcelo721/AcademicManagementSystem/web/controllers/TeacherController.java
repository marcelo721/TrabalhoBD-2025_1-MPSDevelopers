package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.Teacher;
import com.marcelo721.AcademicManagementSystem.entities.User;
import com.marcelo721.AcademicManagementSystem.services.TeacherService;
import com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto.TeacherCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto.TeacherResponseDto;
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
@RequestMapping("api/v1/teachers")
@RequiredArgsConstructor
@Slf4j
public class TeacherController {
    private final TeacherService teacherService;

    @PostMapping
    public ResponseEntity<Void> createTeacher(@RequestBody @Valid TeacherCreateDto dto) {
        teacherService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherResponseDto> findById(@PathVariable Long id) {
        Teacher obj = teacherService.findById(id);
        return ResponseEntity.ok(TeacherResponseDto.toDto(obj));
    }

    @GetMapping()
    public ResponseEntity<List<TeacherResponseDto>> getAll() {
        List<Teacher> teachers = teacherService.findAll();
        return ResponseEntity.ok(TeacherResponseDto.toListDto(teachers));
    }
}
