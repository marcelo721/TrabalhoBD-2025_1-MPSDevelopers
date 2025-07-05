package com.marcelo721.AcademicManagementSystem.entities;

import com.marcelo721.AcademicManagementSystem.entities.Enums.TypeUser;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    // id do usuário pode ser aluno professor ou adm
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false,unique = true)
    private Long id;

    @Column(name = "login", nullable = false, unique = true)
    private String login;

    @Column(name = "password", nullable = false, length = 60)
    private String password;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private TypeUser type;
}
