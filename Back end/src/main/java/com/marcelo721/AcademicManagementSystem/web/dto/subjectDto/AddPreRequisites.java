package com.marcelo721.AcademicManagementSystem.web.dto.subjectDto;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record AddPreRequisites(
        @NotNull
        List<@NotNull Long> prerequisitesId
) {
}
