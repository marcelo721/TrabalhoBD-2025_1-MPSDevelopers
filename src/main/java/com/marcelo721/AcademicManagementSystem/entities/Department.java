package com.marcelo721.AcademicManagementSystem.entities;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Department {

    // código do departamento
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code", unique = true, nullable = false)
    private Long code;

    //nome do departamento
    @Column(name = "name", unique = true, nullable = false)
    private String name;

    //listas de cursos associadas ao departamento
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Course> courses = new ArrayList<>();

    //lista de professores vinculado ao departamento
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<Teacher> teachers = new ArrayList<>();
}
