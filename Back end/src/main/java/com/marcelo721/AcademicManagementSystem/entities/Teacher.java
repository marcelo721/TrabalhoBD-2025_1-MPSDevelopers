package com.marcelo721.AcademicManagementSystem.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    // cpf do professor
    @Column(name = "CPF", nullable = false, unique = true)
    private String cpf;

    // lista de emails vinculado ao professor
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "teacher_emails", joinColumns = @JoinColumn(name = "teacher_id"))
    @Column(name = "email")
    private List<String> emails = new ArrayList<>();

    // lista de telefones (não descrito que para professor o número de telefone é preciso)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "teacher_phones", joinColumns = @JoinColumn(name = "teacher_id"))
    @Column(name = "phone")
    private List<String> telephones;

    @OneToMany(mappedBy = "advisor", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<StudentPostGraduate> advisees;

    // lista de disciplinas que o professer leciona
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "teacher_subjects",
            joinColumns = @JoinColumn(name = "teacher_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    @JsonIgnore
    private List<Subject> subjects = new ArrayList<>();

    // departamento que o professor está alocado
    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonBackReference
    private Department department;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private AppUser user;

}
