package com.educacion.notasasistencia.service.impl;

import com.educacion.notasasistencia.entity.Usuario;
import com.educacion.notasasistencia.repository.UsuarioRepository;
import com.educacion.notasasistencia.service.UsuarioService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public Usuario create(Usuario usuario) {
        if (usuario.getId() == null || usuario.getId().isEmpty()) {
            usuario.setId(UUID.randomUUID().toString());
        }
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario getById(String id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ID: " + id));
    }

    @Override
    public List<Usuario> getAll() {
        return usuarioRepository.findAll();
    }

    @Override
    @Transactional
    public Usuario update(String id, Usuario usuarioDetails) {
        Usuario existing = getById(id);
        existing.setNombre(usuarioDetails.getNombre());
        existing.setEmail(usuarioDetails.getEmail());
        existing.setRol(usuarioDetails.getRol());
        existing.setActivo(usuarioDetails.getActivo());
        // Only update password if provided and not empty
        if (usuarioDetails.getContrasena() != null && !usuarioDetails.getContrasena().isEmpty()) {
            existing.setContrasena(passwordEncoder.encode(usuarioDetails.getContrasena()));
        }
        return usuarioRepository.save(existing);
    }

    @Override
    public Usuario getByEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con email: " + email));
    }

    @Override
    @Transactional
    public void delete(String id) {
        if (!usuarioRepository.existsById(id)) {
            throw new EntityNotFoundException("Usuario no encontrado con ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }
}