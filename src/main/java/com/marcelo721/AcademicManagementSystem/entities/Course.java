package com.marcelo721.AcademicManagementSystem.entities;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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
    private Long id;

    //nome do curso
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    // quantidade mínima de créditos
    @Column(name = "min_credits", nullable = false)
    private Integer minCredits;

    // Estudantes matriculados no curso
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Student> students;

    //disciplinas do curso
    @OneToMany
    private List<Subject> subjects;

    //departamento a qual o curso pertence
    @ManyToOne
    @JoinColumn(name = "department_code")
    private Department department;
}
