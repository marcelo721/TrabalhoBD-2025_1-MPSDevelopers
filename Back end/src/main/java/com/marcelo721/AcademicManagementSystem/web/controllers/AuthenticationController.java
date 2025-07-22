package com.marcelo721.AcademicManagementSystem.web.controllers;

import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import com.marcelo721.AcademicManagementSystem.entities.Enums.RoleUser;
import com.marcelo721.AcademicManagementSystem.entities.Student;
import com.marcelo721.AcademicManagementSystem.jwt.JwtToken;
import com.marcelo721.AcademicManagementSystem.repositories.StudentRepository;
import com.marcelo721.AcademicManagementSystem.repositories.UserRepository;
import com.marcelo721.AcademicManagementSystem.services.EmployeeService;
import com.marcelo721.AcademicManagementSystem.services.StudentService;
import com.marcelo721.AcademicManagementSystem.services.TeacherService;
import com.marcelo721.AcademicManagementSystem.web.dto.AuthDto.AuthRequest;
import com.marcelo721.AcademicManagementSystem.web.dto.AuthDto.AuthResponse;
import com.marcelo721.AcademicManagementSystem.web.exceptions.ErrorMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.marcelo721.AcademicManagementSystem.services.AuthenticationService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/login")
@Slf4j
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final StudentService studentService;
    private final EmployeeService employeeService;
    private final TeacherService teacherService;
    private final AuthenticationService authService;



    @PostMapping
    public ResponseEntity<?> auth(@RequestBody @Valid AuthRequest useauthRequest, HttpServletRequest request){

        AppUser user = userRepository.findByLogin(useauthRequest.code()).get();
        String name = "";
        Long code = 0l;
        if (user.getRole() == RoleUser.STUDENT) {
            name = studentService.findByUserId(user.getId()).getName();
            code = studentService.findByUserId(user.getId()).getId();
            log.info("Student with name " + user.getUsername() + " found");
        }else if (user.getRole() == RoleUser.TEACHER) {
            name = teacherService.findByUserId(user.getId()).getName();
            code = teacherService.findByUserId(user.getId()).getId();
        }else if (user.getRole() == RoleUser.ADMIN) {
            name = null;
            code = null;
        }else if (user.getRole() == RoleUser.EMPLOYEE) {
            name = employeeService.findByUserId(user.getId()).getName();
            code = employeeService.findByUserId(user.getId()).getCode();
        }
        try {
            var userAuthenticationToken = new UsernamePasswordAuthenticationToken(useauthRequest.code(), useauthRequest.password());
            authenticationManager.authenticate(userAuthenticationToken);

            JwtToken token = authService.getTokenAuthenticated(useauthRequest);
            AuthResponse response  = new AuthResponse(token.getToken(), user.getRole(),  user.getLogin(), code, name);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e){
            log.warn("Bad credentials");
        }
        return ResponseEntity.status(401).body(new ErrorMessage(request, HttpStatus.UNAUTHORIZED, "Invalid Credentials"));
    }
}
