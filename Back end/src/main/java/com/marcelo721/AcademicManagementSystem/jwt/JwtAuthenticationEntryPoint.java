package com.marcelo721.AcademicManagementSystem.jwt;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;
// Ativa o logger SLF4J (gera automaticamente um `log` para uso na classe)
@Slf4j
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    // Classe responsável por lidar com acessos não autenticados (ex: quando token está ausente ou inválido)
    // É usada pelo Spring Security como ponto de entrada em falhas de autenticação
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        // Loga o erro no console, útil para depuração
        log.info("Http Status 401 {}", authException.getMessage());
        // Define o cabeçalho WWW-Authenticate como padrão em APIs protegidas com Bearer token
        response.setHeader("www-authenticated", "Bearer realm='/api/v1/auth'");
        // Envia erro HTTP 401 (Unauthorized)
        response.sendError(401);
    }

}

