package com.marcelo721.AcademicManagementSystem.services;

import com.marcelo721.AcademicManagementSystem.entities.*;
import com.marcelo721.AcademicManagementSystem.entities.Enums.RoleUser;
import com.marcelo721.AcademicManagementSystem.repositories.StudentRepository;
import com.marcelo721.AcademicManagementSystem.repositories.SubjectRepository;
import com.marcelo721.AcademicManagementSystem.repositories.TeacherRepository;
import com.marcelo721.AcademicManagementSystem.web.dto.TeacherDto.TeacherCreateDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final DepartmentService departmentService;
    private final StudentRepository studentRepository;
    private final UserService userService;
    private final SubjectRepository subjectRepository;

    @Transactional(readOnly = true)
    public List<Teacher> findAll() {
        return teacherRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Teacher findById(Long code) {
        return teacherRepository.findById(code).
                orElseThrow(() -> new EntityNotFoundException("teacher Not Found"));
    }

    @Transactional
    public void save(TeacherCreateDto teacher) {

        AppUser user = new AppUser();
        user.setPassword(teacher.password());
        user.setRole(RoleUser.TEACHER);
        user.setLogin(teacher.login());
        AppUser savedUser = userService.save(user);

        Teacher obj = teacher.toTeacher();
        Department department = departmentService.getDepartmentById(teacher.departmentId());
        obj.setDepartment(department);
        obj.setUser(user);
        teacherRepository.save(obj);
    }

    @Transactional(readOnly = true)
    public Teacher findByUserId(Long userId) {
        return teacherRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Teacher not found with user id: " + userId));
    }

    @Transactional(readOnly = true)
    public List<Teacher> findAllByDepartmentId(Long departmentId) {
        departmentService.getDepartmentById(departmentId);
        return teacherRepository.findAllByDepartmentCode(departmentId);
    }

    @Transactional
    public void delete(Long code) {

        Teacher teacher = findById(code);

        List<StudentPostGraduate> students = studentRepository.findByAdvisorId(code);
        for (StudentPostGraduate studentPostGraduate : students) {
            studentPostGraduate.setAdvisor(null);
        }
        studentRepository.saveAll(students);

        List<Subject> subjects = subjectRepository.findByTeachersId(code);
        for (Subject subject : subjects) {
            subject.getTeachers().remove(teacher);
        }
        subjectRepository.saveAll(subjects);
        AppUser user = userService.findById(teacher.getUser().getId());
        userService.delete(user.getId());
        teacher.setUser(null);
        teacher.setDepartment(null);
        teacher.setTelephones(null);
        teacher.setEmails(null);
        teacher.getSubjects().clear();
        teacherRepository.delete(teacher);
    }
}
