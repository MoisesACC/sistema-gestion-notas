package com.educacion.notasasistencia.service;

import com.educacion.notasasistencia.entity.Materia;
import java.util.List;

public interface MateriaService {
    Materia create(Materia materia);

    Materia getById(Long id);

    List<Materia> getAll();

    Materia update(Long id, Materia materia);

    List<Materia> getByProfesorId(Long profesorId);

    void delete(Long id);
}