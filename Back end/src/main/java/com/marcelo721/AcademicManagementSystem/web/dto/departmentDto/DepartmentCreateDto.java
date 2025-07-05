package com.marcelo721.AcademicManagementSystem.web.dto.departmentDto;

import com.marcelo721.AcademicManagementSystem.entities.Department;
import jakarta.validation.constraints.NotBlank;

public record DepartmentCreateDto(
        @NotBlank
        String name
) {

    public  Department toDepartment(){
        Department department = new Department();
        department.setName(name);
        return  department;
    }
}
