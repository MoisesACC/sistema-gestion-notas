package com.educacion.notasasistencia.controller;

import com.educacion.notasasistencia.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private com.educacion.notasasistencia.service.UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.get("email"),
                        loginRequest.get("password")));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        com.educacion.notasasistencia.entity.Usuario user = usuarioService.getByEmail(loginRequest.get("email"));

        return ResponseEntity.ok(Map.of(
                "token", jwt,
                "type", "Bearer",
                "user", Map.of(
                        "nombre", user.getNombre(),
                        "email", user.getEmail(),
                        "rol", user.getRol(),
                        "id", user.getId())));
    }
}