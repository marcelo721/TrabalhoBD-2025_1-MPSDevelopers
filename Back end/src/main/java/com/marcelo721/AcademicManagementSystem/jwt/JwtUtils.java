package com.marcelo721.AcademicManagementSystem.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Slf4j// Anotação Lombok que habilita logging (gera um objeto 'log' automaticamente)
public class JwtUtils {
    // Construtor privado para evitar instanciamento (padrão de classe utilitária)
    private JwtUtils(){
    }

    // Definição de tempo de expiração do token
    public static final long  EXPIRE_DAYS = 0;
    public static final long  EXPIRE_HOURS = 12;
    public static final long  EXPIRE_MINUTES = 30;

    // Chave secreta usada para assinar/verificar tokens (isso só está em hardcoded por conta que é teste nunca faça isso kssksks)
    private static final String SECRET_KEY = "012345678901234567890123456789";

    private static Date toExpireDate(Date start){
        // Converte Date para LocalDateTime para manipulação de tempo
        LocalDateTime dateTime = start.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        // Soma os valores de expiração (configuráveis acima)
        LocalDateTime end = dateTime.plusDays(EXPIRE_DAYS).plusHours(EXPIRE_HOURS).plusMinutes(EXPIRE_MINUTES);
        // Converte de volta para Date
        return Date.from(end.atZone(ZoneId.systemDefault()).toInstant());
    }

    public  static JwtToken createToken(AppUser user){

        Date issueAt = new Date();// Data atual
        Date limit = toExpireDate(issueAt);// Calcula data de expiração
        try {

            // Algoritmo de assinatura HMAC SHA-256
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);

            // Criação do token
            String token = JWT.create()
                    .withIssuer("auth-api")// Identifica quem criou o token
                    .withSubject(user.getLogin())// O "dono" do token (usuário)
                    .withExpiresAt(limit)// Tempo de expiração
                    .sign(algorithm);// Assina com a chave secreta

            return new JwtToken(token);// Retorna token encapsulado na classe JwtToken
        }catch (JWTCreationException e){
            throw new RuntimeException("error generating token", e);// Em caso de erro na criação
        }
    }

    // Verifica e decodifica o token
    public static String isValidToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            return JWT.require(algorithm)
                    .withIssuer("auth-api")// Verifica se o token foi criado pelo emissor correto
                    .build()
                    .verify(token)// Valida assinatura e expiração
                    .getSubject();// Retorna o login do usuário associado ao token
        }catch (JWTVerificationException e){
            return "token invalid";// Token inválido (expirado, modificado, etc.)
        }
    }
}
