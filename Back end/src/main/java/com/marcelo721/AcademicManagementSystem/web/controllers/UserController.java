package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import com.marcelo721.AcademicManagementSystem.entities.Enums.RoleUser;
import com.marcelo721.AcademicManagementSystem.services.EmployeeService;
import com.marcelo721.AcademicManagementSystem.services.StudentService;
import com.marcelo721.AcademicManagementSystem.services.TeacherService;
import com.marcelo721.AcademicManagementSystem.services.UserService;
import com.marcelo721.AcademicManagementSystem.web.dto.AuthDto.AuthenticatedUserDto;
import com.marcelo721.AcademicManagementSystem.web.dto.userDto.UserCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.userDto.UserResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final StudentService studentService;
    private final TeacherService teacherService;
    private final EmployeeService employeeService;



    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody @Valid UserCreateDto user) {
        AppUser obj = user.toUser();
        userService.save(obj);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> findById(@PathVariable Long id) {
        AppUser obj = userService.findById(id);
        return ResponseEntity.ok(UserResponseDto.toDto(obj));
    }

    @GetMapping()
    public ResponseEntity<List<UserResponseDto>> getAll() {
        List<AppUser> users = userService.findAll();
        return ResponseEntity.ok(UserResponseDto.toListDto(users));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyData(@AuthenticationPrincipal AppUser user) {

        Long userId = user.getId();
        RoleUser role = user.getRole();

        Object roleData = switch (role) {
            case STUDENT -> studentService.findByUserId(userId);
            case TEACHER -> teacherService.findByUserId(userId);
            case EMPLOYEE -> employeeService.findByUserId(userId);
            case ADMIN -> user;
            default -> null;
        };

        return ResponseEntity.ok(new AuthenticatedUserDto(userId, role, roleData));
    }
}
