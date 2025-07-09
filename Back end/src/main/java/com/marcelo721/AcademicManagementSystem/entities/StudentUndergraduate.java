package com.marcelo721.AcademicManagementSystem.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentUndergraduate extends Student {

    // ano que o estudante entrou na universidade
    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "admission_year",  nullable = false)
    private LocalDate admissionYear;
}

