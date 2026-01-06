package com.educacion.notasasistencia.service;

import com.educacion.notasasistencia.entity.Usuario;
import java.util.List;

public interface UsuarioService {
    Usuario create(Usuario usuario);

    Usuario getById(String id);

    List<Usuario> getAll();

    Usuario update(String id, Usuario usuario);

    Usuario getByEmail(String email);

    void delete(String id);
}