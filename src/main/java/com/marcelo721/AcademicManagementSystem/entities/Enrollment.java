package com.marcelo721.AcademicManagementSystem.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Enrollment {

    // código da matricula de um aluno
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code", unique = true, nullable = false)
    private Long code;

    // estudante associado a matrícula
    @ManyToOne
    private Student student;

    // disciplina que está associada a matricula
    @ManyToOne
    private Subject subject;

    // nota final na disciplina
    @Column(name = "finalGrade", nullable = false)
    private float finalGrade;

    //frequencia
    @Column(name = "attendance", nullable = false)
    private Integer attendance;
}
