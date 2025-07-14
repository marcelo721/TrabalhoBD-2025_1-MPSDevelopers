package com.marcelo721.AcademicManagementSystem.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "student_type")
public class Student {

    // matrícula do estudante
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "code", unique = true, nullable = false)
    private Long id;

    // nome do estudante
    @Column(name = "name", nullable = false, length = 70)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

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

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id", unique = true)
    private AppUser user;
}
