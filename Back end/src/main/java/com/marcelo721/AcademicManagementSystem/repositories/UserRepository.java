package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // método para listar todos os usuários
    @Query(value = "SELECT * FROM users", nativeQuery = true)
    List<User> findAll();

    // Buscar por ID (também já implementado por padrão)
    @Query(value = "SELECT * FROM users WHERE id = :id", nativeQuery = true)
    Optional<User> findById(Long id);

    @Modifying
    @Query(value = "INSERT INTO users (login, password, type) VALUES (:login, :password, :type)", nativeQuery = true)
    void salvarUsuario(@Param("login") String login, @Param("password") String password, @Param("type") String type);

    @Modifying
    @Query(value = "DELETE FROM users WHERE id = :id", nativeQuery = true)
    void deleteById(@Param("id") Long id);
}
