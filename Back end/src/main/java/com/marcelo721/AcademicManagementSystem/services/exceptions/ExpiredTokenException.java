package com.marcelo721.AcademicManagementSystem.services.exceptions;

public class ExpiredTokenException extends RuntimeException{

    public ExpiredTokenException(String message){
        super(message);
    }
}