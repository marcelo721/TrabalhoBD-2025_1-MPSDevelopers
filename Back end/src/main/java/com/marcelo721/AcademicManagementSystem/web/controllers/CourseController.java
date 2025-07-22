package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import com.marcelo721.AcademicManagementSystem.services.CourseService;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseUpdateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.studentDto.StudentResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.subjectDto.SubjectResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/courses")
@RequiredArgsConstructor
@Slf4j
public class CourseController {

    private final CourseService courseService;

    @PreAuthorize("@checker.canCreateCourse(#dto)")
    @PostMapping
    public ResponseEntity<Void> CreateCourse(@RequestBody @Valid CourseCreateDto dto) {
        courseService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')or hasRole('EMPLOYEE')")//tested
    @GetMapping("/{id}")
    public ResponseEntity<CourseResponseDto> findById(@PathVariable Long id) {
        Course obj = courseService.findById(id);
        return ResponseEntity.ok(CourseResponseDto.toDto(obj));
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @GetMapping()
    public ResponseEntity<List<CourseResponseDto>> getAll() {
        List<Course> courses = courseService.findAll();
        return ResponseEntity.ok(CourseResponseDto.toListDto(courses));
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @GetMapping("/obligatory-subjects/{courseCode}")
    public ResponseEntity<List<SubjectResponseDto>>findObligatorySubjectsByCourseCode(@PathVariable Long courseCode) {
        List<Subject> subjects = courseService.findObligatorySubjectsByCourseCode(courseCode);
        return ResponseEntity.ok(SubjectResponseDto.toListDto(subjects));
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @GetMapping("/optional-subjects/{courseCode}")
    public ResponseEntity<List<SubjectResponseDto>>findOptionalSubjectsByCourseCode (@PathVariable Long courseCode) {
        List<Subject> subjects = courseService.findOptionalSubjectsByCourseCode(courseCode);
        return ResponseEntity.ok(SubjectResponseDto.toListDto(subjects));
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @GetMapping("/students-course/{courseCode}")
    public ResponseEntity<List<StudentResponseDto>>findStudentsCourseByCourseCode (@PathVariable Long courseCode) {
        List<Student> students = courseService.findStudentsByCourseCode(courseCode);
        return ResponseEntity.ok(StudentResponseDto.fromStudents(students));
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @GetMapping("/completed-all-mandatory/{courseCode}")
    public ResponseEntity<List<StudentResponseDto>> findStudentsCompletedMandatoryByCourseCode (@PathVariable Long courseCode) {
        List<Student> students = courseService.findStudentsByCourseCode(courseCode);
        return ResponseEntity.ok(StudentResponseDto.fromStudents(students));
    }

    @PreAuthorize("hasRole('ADMIN')")//tested
    @DeleteMapping("{courseId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long courseId) {
        courseService.deleteCourseById(courseId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{code}")
    public ResponseEntity<Void> updateCourse(@PathVariable Long code, @RequestBody CourseUpdateDto dto){
        courseService.updateCourse(code, dto);
        return ResponseEntity.ok().build();
    }
}
