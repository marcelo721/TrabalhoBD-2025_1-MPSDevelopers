package com.marcelo721.AcademicManagementSystem.entities;


import com.marcelo721.AcademicManagementSystem.entities.Enums.TypeStudent;
import jakarta.persistence.*;
import lombok.*;

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

    // curso que estudante está cursando
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    // lista de telefones
    @OneToMany(mappedBy = "studentPhone", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Phone> telephones;

    // disciplinas que o estudante está matriulado
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrollment> enrollments;

}
