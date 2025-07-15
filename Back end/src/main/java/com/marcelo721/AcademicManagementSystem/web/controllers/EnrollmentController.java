package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.Enrollment;
import com.marcelo721.AcademicManagementSystem.services.EnrollmentService;
import com.marcelo721.AcademicManagementSystem.web.dto.enrollmentDto.EnrollmentCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.enrollmentDto.EnrollmentResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/enrollments")
@RequiredArgsConstructor
@Slf4j
public class EnrollmentController {

    private final EnrollmentService enrollmentService;


    @PreAuthorize("hasRole('ADMIN')")//tested
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody @Valid EnrollmentCreateDto dto) {
        enrollmentService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @GetMapping("/{id}")
    public ResponseEntity<EnrollmentResponseDto> findById(@PathVariable Long id) {
        Enrollment obj = enrollmentService.findById(id);
        return ResponseEntity.ok(EnrollmentResponseDto.toDto(obj));
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @GetMapping()
    public ResponseEntity<List<EnrollmentResponseDto>> getAll() {
        List<Enrollment> obj = enrollmentService.findAll();
        return ResponseEntity.ok(EnrollmentResponseDto.toListDto(obj));
    }
}
