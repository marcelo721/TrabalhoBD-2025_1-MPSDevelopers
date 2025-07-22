package com.marcelo721.AcademicManagementSystem.services;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.entities.Subject;
import com.marcelo721.AcademicManagementSystem.repositories.CourseRepository;
import com.marcelo721.AcademicManagementSystem.repositories.StudentRepository;
import com.marcelo721.AcademicManagementSystem.repositories.SubjectRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseUpdateDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final DepartmentService departmentService;
    private final SubjectRepository subjectRepository;
    private final StudentRepository studentRepository;
    private final SubjectService subjectService;

    @Transactional
    public void save(CourseCreateDto courseCreateDto) {
        Course course = courseCreateDto.toCourse();
        Department department = departmentService.getDepartmentById(courseCreateDto.departmentId());
        course.setDepartment(department);
        courseRepository.save(course);
    }

    @Transactional(readOnly = true)
    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Course findById(Long code) {
        return courseRepository.findById(code).orElseThrow(() -> new EntityNotFoundException("Course not found"));
    }

    @Transactional(readOnly = true)
    public List<Subject> findObligatorySubjectsByCourseCode(Long courseCode) {
        findById(courseCode);
        return subjectRepository.findObligatorySubjectsByCourseCode(courseCode);
    }

    @Transactional(readOnly = true)
    public List<Subject> findOptionalSubjectsByCourseCode(Long courseCode) {
        findById(courseCode);
        return subjectRepository.findOptionalSubjectsByCourseCode(courseCode);
    }

    @Transactional(readOnly = true)
    public List<Student> findStudentsByCourseCode(Long courseCode) {
        findById(courseCode);
        return studentRepository.findByCourseCode(courseCode);
    }

    @Transactional(readOnly = true)
    public List<Student> findStudentsWhoCompletedAllMandatorySubjects(Long courseCode) {
        findById(courseCode);
        return studentRepository.findStudentsWhoCompletedAllMandatorySubjects(courseCode);
    }

    @Transactional
    public void deleteCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Course not found: " + id));

        for (Subject subject : new ArrayList<>(course.getSubjects())) {
            subjectService.deleteSubjectById(subject.getCode());
        }
        course.getSubjects().clear();

        studentRepository.deleteAll(new ArrayList<>(course.getStudents()));
        course.getStudents().clear();

        Department dept = course.getDepartment();
        if (dept != null) {
            dept.getCourses().remove(course);
        }
        courseRepository.delete(course);
    }

    @Transactional
    public void updateCourse(Long codeCourse, CourseUpdateDto dto){
        Course course = findById(codeCourse);
        course.setName(dto.newName());
        courseRepository.save(course);
    }
}
