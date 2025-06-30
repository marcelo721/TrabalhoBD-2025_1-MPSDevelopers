package com.marcelo721.AcademicManagementSystem.entities;

import com.marcelo721.AcademicManagementSystem.entities.Enums.TypeSubject;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Subject {

    //código da disciplina
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code",unique = true, nullable = false)
    private Long code;

    //nome da disciplina
    @Column(name = "name", unique = true, nullable = false)
    private String name;

    // quantidades de crétidos que a disciplina oferta
    @Column(name = "credits", nullable = false)
    private Integer credits;

    // ementa da disciplina
    @Column(name = "syllabus", nullable = false)
    private String syllabus;

    // curso a qual a disciplina pertence
    @ManyToOne
    private Course course;

    // Lista de matrículas associadas a esta disciplina.
    // Representa os alunos que estão cursando (ou cursaram) esta disciplina
    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrollment> enrollments;

    // definir se uma disciplina é optativa ou obrigatória
    @Column(name = "type_subject", nullable = false)
    @Enumerated(EnumType.STRING)
    private TypeSubject typeSubject;


    //lista de matérias que são pré requisitos para essa
    @ManyToMany
    @JoinTable(
            name = "subject_prerequisites",
            joinColumns = @JoinColumn(name = "subject_code"),
            inverseJoinColumns = @JoinColumn(name = "prerequisite_code")
    )
    private Set<Subject> prerequisites = new HashSet<>();

    // Disciplinas para as quais esta disciplina é pré-requisito (opcional, para navegação inversa)
    @ManyToMany(mappedBy = "prerequisites")
    private Set<Subject> dependentSubjects = new HashSet<>();

    // lista dos professores que leciona a disciplina
    @ManyToMany(mappedBy = "subjects")
    private List<Teacher> teachers = new ArrayList<>();
}
