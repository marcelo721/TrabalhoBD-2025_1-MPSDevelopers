package com.marcelo721.AcademicManagementSystem.repositories;

import com.marcelo721.AcademicManagementSystem.entities.Phone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
// Herda todos os métodos CRUD (findAll, findById, save, delete etc.), responsável por se comunicar com o banco de dados
public interface PhoneRepository extends JpaRepository<Phone, Long> {
}
