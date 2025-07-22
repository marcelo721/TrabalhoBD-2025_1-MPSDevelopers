package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.Subject;
import com.marcelo721.AcademicManagementSystem.services.SubjectService;
import com.marcelo721.AcademicManagementSystem.web.dto.subjectDto.SubjectCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.subjectDto.SubjectResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.subjectDto.SubjectUpdateDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/subjects")
@RequiredArgsConstructor
@Slf4j
public class SubjectController {

    private final SubjectService subjectService;

    @PreAuthorize("hasRole('ADMIN')")//tested
    @PostMapping
    public ResponseEntity<Void> createSubject(@RequestBody @Valid SubjectCreateDto dto) {
        subjectService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @GetMapping("/{id}")
    public ResponseEntity<SubjectResponseDto> findById(@PathVariable Long id) {
        Subject obj = subjectService.findById(id);
        return ResponseEntity.ok(SubjectResponseDto.toDto(obj));
    }

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")//tested
    public ResponseEntity<List<SubjectResponseDto>> getAll() {
        List<Subject> all = subjectService.findAll();
        return ResponseEntity.ok(SubjectResponseDto.toListDto(all));
    }


    @DeleteMapping("/{subjectId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long subjectId) {
        subjectService.deleteSubjectById(subjectId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{code}")
    public ResponseEntity<Void> updateSubject(@PathVariable Long code, @RequestBody SubjectUpdateDto dto){
        subjectService.updateSubject(code, dto);
        return ResponseEntity.ok().build();
    }
}
