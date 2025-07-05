package com.marcelo721.AcademicManagementSystem.services;


import com.marcelo721.AcademicManagementSystem.entities.Phone;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.repositories.StudentRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.studentDto.StudentCreateDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final CourseService courseService;
    private final PhoneService phoneService;


    @Transactional(readOnly = true)
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Student findById(long code) {
            return studentRepository.findById(code).
                    orElseThrow(() -> new EntityNotFoundException("Student Not Found"));
    }

    @Transactional
    public void save(StudentCreateDto studentCreateDto) {
        Student student = new Student();
        student.setTelephones(studentCreateDto.phone());
        student.setName(studentCreateDto.name());
        student.setAddress(studentCreateDto.address());
        student.setTypeStudent(studentCreateDto.typeStudent());
        student.setCourse(courseService.findById(studentCreateDto.courseCode()));
        studentRepository.save(student);
    }

    @Transactional
    public void delete(long code) {
        studentRepository.deleteById(code);
    }
}
