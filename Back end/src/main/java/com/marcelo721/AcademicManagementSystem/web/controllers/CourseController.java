package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import com.marcelo721.AcademicManagementSystem.services.CourseService;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.studentDto.StudentResponseDto;
import com.marcelo721.AcademicManagementSystem.web.dto.subjectDto.SubjectResponseDto;
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

    @GetMapping("/obligatory-subjects/{courseCode}")
    public ResponseEntity<List<SubjectResponseDto>>findObligatorySubjectsByCourseCode (@PathVariable Long courseCode) {
        List<Subject> subjects = courseService.findObligatorySubjectsByCourseCode(courseCode);
        return ResponseEntity.ok(SubjectResponseDto.toListDto(subjects));
    }

    @GetMapping("/optional-subjects/{courseCode}")
    public ResponseEntity<List<SubjectResponseDto>>findOptionalSubjectsByCourseCode (@PathVariable Long courseCode) {
        List<Subject> subjects = courseService.findOptionalSubjectsByCourseCode(courseCode);
        return ResponseEntity.ok(SubjectResponseDto.toListDto(subjects));
    }

    @GetMapping("/students-course/{courseCode}")
    public ResponseEntity<List<StudentResponseDto>>findStudentsCourseByCourseCode (@PathVariable Long courseCode) {
        List<Student> students = courseService.findStudentsByCourseCode(courseCode);
        return ResponseEntity.ok(StudentResponseDto.fromStudents(students));
    }

    @GetMapping("/completed-all-mandatory/{courseCode}")
    public ResponseEntity<List<StudentResponseDto>> findStudentsCompletedMandatoryByCourseCode (@PathVariable Long courseCode) {
        List<Student> students = courseService.findStudentsByCourseCode(courseCode);
        return ResponseEntity.ok(StudentResponseDto.fromStudents(students));
    }

    @DeleteMapping("{courseId}")
    public ResponseEntity<Void> deleteById(@PathVariable Long courseId) {
        courseService.deleteCourseById(courseId);
        return ResponseEntity.noContent().build();
    }
}
