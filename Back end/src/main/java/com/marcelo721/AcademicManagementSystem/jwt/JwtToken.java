package com.marcelo721.AcademicManagementSystem.jwt;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
// Lombok gera automaticamente os construtores, getters e setters
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class JwtToken {
    // Representa o token JWT em uma resposta de autenticação
    private String token;
}
