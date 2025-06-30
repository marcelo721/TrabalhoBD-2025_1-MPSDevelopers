package com.marcelo721.AcademicManagementSystem.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Teacher {

    // código do professor
    @Id
    @Column(name = "code",unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // nome do professor
    @Column(name = "name", nullable = false)
    private String name;

    //data de nascimento do professor
    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "birth_date",  nullable = false)
    private LocalDate birthDate;

    // data que o professor entrou para o departamento
    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "hire_date",  nullable = false)
    private LocalDate hireDate;

    // lista de emails vinculado ao professor
    @ElementCollection
    @CollectionTable(name = "teacher_emails", joinColumns = @JoinColumn(name = "teacher_id"))
    @Column(name = "email")
    private List<String> emails = new ArrayList<>();

    // lista de telefones (não descrito que para professor o número de telefone é preciso)
    @ElementCollection
    @CollectionTable(name = "teacher_phones", joinColumns = @JoinColumn(name = "teacher_id"))
    @Column(name = "phone")
    private List<String> telephones;

    // lista de disciplinas que o professer leciona
    @ManyToMany
    @JoinTable(
            name = "teacher_subjects",
            joinColumns = @JoinColumn(name = "teacher_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private List<Subject> subjects = new ArrayList<>();

    // departamento que o professor está alocado
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

}
