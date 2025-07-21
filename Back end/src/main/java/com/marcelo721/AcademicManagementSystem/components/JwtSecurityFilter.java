package com.marcelo721.AcademicManagementSystem.components;

import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import com.marcelo721.AcademicManagementSystem.jwt.JwtUtils;
import com.marcelo721.AcademicManagementSystem.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
@RequiredArgsConstructor
@Slf4j
/*Esse componente JwtSecurityFilter é um
filtro de segurança personalizado que intercepta todas as requisições HTTP para
Autenticar usuários com base em um token JWT presente no cabeçalho Authorization.
Ele funciona como parte da autenticação com token JWT no Spring Security,
substituindo sessões tradicionais por um token que é verificado a cada requisição
 */
public class JwtSecurityFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = extractToken(request);

        if (token!= null){
            String login = JwtUtils.isValidToken(token);
            AppUser user = userRepository.findByLogin(login).orElse(null);
            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("User authenticated: {} with roles: {}", user.getLogin(), user.getAuthorities());
        }
        filterChain.doFilter(request, response);
    }

    public String extractToken(HttpServletRequest request){

        var authHeader = request.getHeader("Authorization");
        if (authHeader == null)
            return null;

        if(!authHeader.split(" ")[0].equals("Bearer")){
            return null;
        }
        return authHeader.split(" ")[1];
    }
}
