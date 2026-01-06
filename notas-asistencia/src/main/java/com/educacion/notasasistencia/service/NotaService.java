package com.educacion.notasasistencia.service;

import com.educacion.notasasistencia.entity.Nota;
import java.util.List;

public interface NotaService {
    Nota create(Nota nota);

    Nota getById(Long id);

    List<Nota> getAll();

    Nota update(Long id, Nota nota);

    List<Nota> getByProfesorId(Long profesorId);

    void delete(Long id);
}