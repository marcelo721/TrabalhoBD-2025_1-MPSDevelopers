package com.marcelo721.AcademicManagementSystem.services;


import com.marcelo721.AcademicManagementSystem.entities.AppUser;
import com.marcelo721.AcademicManagementSystem.jwt.JwtToken;
import com.marcelo721.AcademicManagementSystem.jwt.JwtUtils;
import com.marcelo721.AcademicManagementSystem.web.dto.AuthDto.AuthRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthenticationService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return userService.findByLogin(login);
    }
    public JwtToken getTokenAuthenticated(AuthRequest authRequest){
        AppUser user = userService.findByLogin(authRequest.code());

        return JwtUtils.createToken(user);
    }
}
