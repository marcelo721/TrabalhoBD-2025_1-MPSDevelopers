package com.marcelo721.AcademicManagementSystem.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
// Declaração de uma entidade JPA representando um empregado
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    // código do Empregado
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code", unique = true)
    private Long code;

    // nome do empregado
    @Column(name = "name", nullable = false)
    private String name;

    // Relacionamento 1:1 com AppUser (um empregado tem um usuário)
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", unique = true)
    private AppUser user;

    // Muitos empregados podem pertencer a um mesmo departamento
    @ManyToOne()
    @JoinColumn(name = "department_id")
    @JsonBackReference
    private Department department;
}
