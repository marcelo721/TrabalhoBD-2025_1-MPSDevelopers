package com.marcelo721.AcademicManagementSystem.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Phone {

    //id do telefone
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true, nullable = false)
    private Long id;

    // descrição do telefone
    @Column(name = "description", nullable = false,length = 100)
    private String description;

    // número do telefone
    @Column(name = "number", nullable = false,length = 20)
    private String number;

    // nome do estudante dono do telefone
    @ManyToOne
    @JoinColumn(name = "student_code")
    private Student studentPhone;

}
