package com.marcelo721.AcademicManagementSystem.web.dto.userDto;

import com.marcelo721.AcademicManagementSystem.entities.AppUser;

import java.util.ArrayList;
import java.util.List;

public record UserResponseDto(
    String login,
    Long id
)
{
    public static UserResponseDto toDto(AppUser user){
        return new UserResponseDto(user.getLogin(), user.getId());
    }

    public static List<UserResponseDto> toListDto(List<AppUser> users){
        List<UserResponseDto> dtos = new ArrayList<>();

        for(AppUser user : users){
            dtos.add(toDto(user));
        }
        return dtos;
    }
}