package com.marcelo721.AcademicManagementSystem.services;

import com.marcelo721.AcademicManagementSystem.entities.Course;
import com.marcelo721.AcademicManagementSystem.entities.Department;
import com.marcelo721.AcademicManagementSystem.repositories.CourseRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.courseDto.CourseCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final DepartmentService departmentService;

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
        return courseRepository.findById(code).orElse(null);
    }

}
