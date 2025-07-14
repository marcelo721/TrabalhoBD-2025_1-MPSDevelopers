package com.marcelo721.AcademicManagementSystem.web.dto.AuthDto;

public record AuthRequest(
        String code,
        String password
) {
}
