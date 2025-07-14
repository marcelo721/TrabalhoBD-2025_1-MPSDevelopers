package com.marcelo721.AcademicManagementSystem.web.controllers;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import com.marcelo721.AcademicManagementSystem.services.TeacherService;
import com.marcelo721.AcademicManagementSystem.web.dto.enrollmentDto.EnrollmentResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.studentDto.*;
import com.marcelo721.AcademicManagementSystem.services.StudentService;
import com.marcelo721.AcademicManagementSystem.web.dto.subjectDto.SubjectResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final TeacherService teacherService;

    @PostMapping("/undergraduate")
    public ResponseEntity<Void> createUndergraduate(@RequestBody @Valid StudentCreateDto dto) {
        studentService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/postgraduate")
    public ResponseEntity<StudentResponseDto> createPostgraduate(@RequestBody @Valid StudentCreateDto dto) {
        studentService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponseDto> findById(@PathVariable Long id) {
        Student student = studentService.findById(id);
        return ResponseEntity.ok(StudentResponseDto.fromStudent(student));
    }

    @GetMapping
    public ResponseEntity<List<StudentResponseDto>> findAll() {
        List<Student> students = studentService.findAll();
        return ResponseEntity.ok(StudentResponseDto.fromStudents(students));
    }

    @GetMapping("/undergraduate")
    public ResponseEntity<List<StudentResponseDto>> findAllUndergraduates() {
        List<Student> students = studentService.findAll();
        return ResponseEntity.ok(StudentResponseDto.fromStudents(students));
    }

    @GetMapping("/postgraduate")
    public ResponseEntity<List<StudentResponseDto>> findAllPostgraduates() {
        List<Student> students = studentService.findAll();
        return ResponseEntity.ok(StudentResponseDto.fromStudents(students));
    }

    @GetMapping("/{studentCode}/enrollments/current")
    public ResponseEntity<List<SubjectResponseDto>> findCurrentEnrollment(@PathVariable Long studentCode) {
        List<Subject> response = studentService.findSubjectsCurrentlyEnrolledByStudent(studentCode);
        return ResponseEntity.ok(SubjectResponseDto.toListDto(response));
    }

    @GetMapping("/{studentCode}/enrollments/completed")
    public ResponseEntity<List<SubjectResponseDto>> findCompletedSubjectsByStudent(@PathVariable Long studentCode) {
        List<Subject> response = studentService.findCompletedSubjectsByStudent(studentCode);
        return ResponseEntity.ok(SubjectResponseDto.toListDto(response));
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long studentId) {
        studentService.deleteStudentById(studentId);
        return ResponseEntity.noContent().build();
    }

}