package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.User;
import com.marcelo721.AcademicManagementSystem.services.UserService;
import com.marcelo721.AcademicManagementSystem.web.dto.userDto.UserCreateDto;
import com.marcelo721.AcademicManagementSystem.web.dto.userDto.UserResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody @Valid UserCreateDto user) {
        User obj = user.toUser();
        userService.save(obj);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> findById(@PathVariable Long id) {
        User obj = userService.findById(id);
        return ResponseEntity.ok(UserResponseDto.toDto(obj));
    }

    @GetMapping()
    public ResponseEntity<List<UserResponseDto>> getAll() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(UserResponseDto.toListDto(users));
    }
}
