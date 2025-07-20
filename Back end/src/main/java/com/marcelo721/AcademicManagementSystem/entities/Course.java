package com.marcelo721.AcademicManagementSystem.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

// Declaração de uma entidade JPA representando um Curso
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Course {

    //código do curso
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code",unique = true, nullable = false)
    private Long code;

    //nome do curso
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    // quantidade mínima de créditos
    @Column(name = "min_credits", nullable = false)
    private Integer minCredits;

    // Estudantes matriculados no curso
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.EAGER,orphanRemoval = true)
    @JsonIgnore
    private List<Student> students;

    //disciplinas do curso
    @OneToMany( mappedBy = "course",cascade = CascadeType.ALL, fetch = FetchType.EAGER,orphanRemoval = true)
    @JsonIgnore
    private List<Subject> subjects;

    //departamento a qual o curso pertence
    @ManyToOne
    @JoinColumn(name = "department_code")
    @JsonBackReference
    private Department department;
}
