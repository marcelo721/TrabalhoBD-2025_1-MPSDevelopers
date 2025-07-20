package com.marcelo721.AcademicManagementSystem.services.exceptions;


// exception responsável para quando matricular um estudante mais de uma vez em uma disciplina
public class EnrollmentAlreadyCreatedException extends RuntimeException {
    public EnrollmentAlreadyCreatedException(String message) {
        super(message);
    }
}
