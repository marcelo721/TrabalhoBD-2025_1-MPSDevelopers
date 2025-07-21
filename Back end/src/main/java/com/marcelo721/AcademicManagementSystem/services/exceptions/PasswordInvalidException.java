package com.marcelo721.AcademicManagementSystem.services.exceptions;

// exception responsável para quando o usuário tentar autenticar com uma senha incorreta
public class PasswordInvalidException extends RuntimeException {

    public PasswordInvalidException(String message) {
        super(message);
    }
}
