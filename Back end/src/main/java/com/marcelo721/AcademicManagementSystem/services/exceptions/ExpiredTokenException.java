package com.marcelo721.AcademicManagementSystem.services.exceptions;

//expcetion responsável para quando o token expirar
public class ExpiredTokenException extends RuntimeException{

    public ExpiredTokenException(String message){
        super(message);
    }
}