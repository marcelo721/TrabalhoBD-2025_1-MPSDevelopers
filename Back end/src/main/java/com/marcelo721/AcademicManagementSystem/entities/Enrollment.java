package com.marcelo721.AcademicManagementSystem.entities;

import com.marcelo721.AcademicManagementSystem.entities.Enums.StatusEnrollment;
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
    @JoinColumn(name = "student_code")
    private Student student;

    // disciplina que está associada a matricula
    @ManyToOne
    private Subject subject;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_enrollment", nullable = false)
    private StatusEnrollment enrollmentStatus;

    // nota final na disciplina
    @Column(name = "final_grade")
    private float finalGrade;

    //frequencia
    @Column(name = "attendance")
    private Float attendance;
}
