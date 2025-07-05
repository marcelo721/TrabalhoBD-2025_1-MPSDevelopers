package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.services.CourseService;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/courses")
@RequiredArgsConstructor
@Slf4j
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<Void> CreateCourse(@RequestBody @Valid CourseCreateDto dto) {
        courseService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponseDto> findById(@PathVariable Long id) {
        Course obj = courseService.findById(id);
        return ResponseEntity.ok(CourseResponseDto.toDto(obj));
    }

    @GetMapping()
    public ResponseEntity<List<CourseResponseDto>> getAll() {
        List<Course> courses = courseService.findAll();
        return ResponseEntity.ok(CourseResponseDto.toListDto(courses));
    }
}
