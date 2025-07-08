package com.marcelo721.AcademicManagementSystem.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.marcelo721.AcademicManagementSystem.entities.Enums.TypeStudent;
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
public class Student {

    // matrícula do estudante
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "code", unique = true, nullable = false)
    private Long id;

    // nome do estudante
    @Column(name = "name", nullable = false, length = 70)
    private String name;

    // tipo do estudante se é pós graduação ou não
    @Column(name = "type_student", nullable = false)
    @Enumerated(EnumType.STRING)
    private TypeStudent typeStudent;

    // ano que o estudante entrou na universidade
    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "admission_year",  nullable = false)
    private LocalDate admissionYear;

    @Column(name = "address", nullable = false)
    private String address;

    // cursos que o aluno já cursou para alunos de graduação
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "previous_courses", joinColumns = @JoinColumn(name = "student_id"))
    @Column(name = "previous_courses")
    private List<String> previousCourses = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "advisor_id")
    private Teacher advisor;

    // curso que estudante está cursando
    @ManyToOne
    @JoinColumn(name = "course_code", nullable = false)
    @JsonIgnore
    private Course course;

    // lista de telefones
    @OneToMany(mappedBy = "studentPhone", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Phone> telephones;

    // disciplinas que o estudante está matriulado
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Enrollment> enrollments;
}
