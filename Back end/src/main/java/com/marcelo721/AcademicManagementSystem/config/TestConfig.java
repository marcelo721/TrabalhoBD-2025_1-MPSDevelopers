package com.marcelo721.AcademicManagementSystem.config;

import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import com.marcelo721.AcademicManagementSystem.entities.Enums.RoleUser;
import com.marcelo721.AcademicManagementSystem.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class TestConfig implements CommandLineRunner {

    private final UserService userService;
    @Override
    public void run(String... args) throws Exception {

        AppUser appUser = new AppUser();
        appUser.setRole(RoleUser.ADMIN);
        appUser.setLogin("adminPamy");
        appUser.setPassword("root");

        userService.save(appUser);

    }
}
