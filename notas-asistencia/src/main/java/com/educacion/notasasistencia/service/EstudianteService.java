package com.educacion.notasasistencia.service;

import com.educacion.notasasistencia.entity.Estudiante;
import java.util.List;

public interface EstudianteService {
    Estudiante create(Estudiante estudiante);
    Estudiante getById(Long id);
    List<Estudiante> getAll();
    Estudiante update(Long id, Estudiante estudiante);
    void delete(Long id);
}