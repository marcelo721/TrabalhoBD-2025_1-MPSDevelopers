package com.marcelo721.AcademicManagementSystem.services.exceptions;

public class EnrollmentAlreadyCreatedException extends RuntimeException {
    public EnrollmentAlreadyCreatedException(String message) {
        super(message);
    }
}
