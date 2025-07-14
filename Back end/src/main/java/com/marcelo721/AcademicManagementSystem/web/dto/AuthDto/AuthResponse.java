package com.marcelo721.AcademicManagementSystem.web.dto.AuthDto;

import com.marcelo721.AcademicManagementSystem.entities.Enums.RoleUser;

public record AuthResponse(
        String Token,
        RoleUser role,
        String username
) {
}
