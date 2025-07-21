package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
//Herda todos os métodos CRUD (findAll, findById, save, delete etc.), responsável por se comunicar com o banco de dados
@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {

    // encontra um usuário pelo login do user
    Optional<AppUser> findByLogin(String login);
}
