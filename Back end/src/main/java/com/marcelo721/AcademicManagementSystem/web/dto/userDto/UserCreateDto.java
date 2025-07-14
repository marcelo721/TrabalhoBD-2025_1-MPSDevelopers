package com.marcelo721.AcademicManagementSystem.web.dto.userDto;

import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import com.marcelo721.AcademicManagementSystem.entities.Enums.RoleUser;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record UserCreateDto(
        @NotBlank
        String login,

        @NotNull
        @Pattern(
                regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&_]{8,}$",
                message = "A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, " +
                        "uma letra minúscula, um número e um caractere especial."
        )
        String password,

        @NotNull
        RoleUser roleUser
){
        public AppUser toUser() {

                AppUser user = new AppUser();
                user.setLogin(login);
                user.setPassword(password);
                user.setRole(roleUser);
                return user;
        }
}
