package com.marcelo721.AcademicManagementSystem.entities;

import com.marcelo721.AcademicManagementSystem.entities.Enums.RoleUser;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

// Define esta classe como uma entidade JPA mapeada para a tabela "users"
@Entity
@Getter
@Setter
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class AppUser implements UserDetails {

    // Classe que representa um usuário do sistema (admin, professor, aluno).
    // Implementa a interface UserDetails para integração com Spring Security.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Geração automática de IDs (auto incremento)
    @Column(name = "id", nullable = false,unique = true) // Identificador único do usuário
    private Long id;

    @Column(name = "login", nullable = false, unique = true) // Nome de login (usado como username no Spring Security)
    private String login;

    @Column(name = "password", nullable = false, length = 60)
    private String password;// Senha do usuário (criptografada)

    @Column(name = "role_user", nullable = false) // Salva o valor da enum como string no banco
    @Enumerated(EnumType.STRING)
    private RoleUser role; // Papel (role) do usuário no sistema (ADMIN, PROFESSOR, ALUNO, etc.)

    // Retorna as autoridades (permissões) do usuário, exigido pelo Spring Security.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    // Retorna o login como username para o Spring Security
    @Override
    public String getUsername() {
        return this.login;
    }

    @Override public boolean isAccountNonExpired() { return true; }

    @Override public boolean isAccountNonLocked() { return true; }

    @Override public boolean isCredentialsNonExpired() { return true; }

    @Override public boolean isEnabled() { return true; }

}
