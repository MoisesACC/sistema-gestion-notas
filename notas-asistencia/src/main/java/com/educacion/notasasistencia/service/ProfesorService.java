package com.educacion.notasasistencia.service;

import com.educacion.notasasistencia.entity.Profesor;
import java.util.List;

public interface ProfesorService {
    Profesor create(Profesor profesor);

    Profesor getById(Long id);

    List<Profesor> getAll();

    Profesor update(Long id, Profesor profesor);

    Profesor getByEmail(String email);

    void delete(Long id);
}