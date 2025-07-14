package com.marcelo721.AcademicManagementSystem.web.dto.AuthDto;

import com.marcelo721.AcademicManagementSystem.entities.Enums.RoleUser;

public record AuthenticatedUserDto(
        Long code,
        RoleUser role,
        Object roleData
) {
}
