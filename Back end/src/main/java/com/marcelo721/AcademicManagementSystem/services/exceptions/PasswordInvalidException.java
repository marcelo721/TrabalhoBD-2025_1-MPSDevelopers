package com.marcelo721.AcademicManagementSystem.services.exceptions;

public class PasswordInvalidException extends RuntimeException {

    public PasswordInvalidException(String message) {
        super(message);
    }
}
