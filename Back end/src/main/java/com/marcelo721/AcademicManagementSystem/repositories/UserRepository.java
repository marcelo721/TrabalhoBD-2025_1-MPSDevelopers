package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByLogin(String login);
}
