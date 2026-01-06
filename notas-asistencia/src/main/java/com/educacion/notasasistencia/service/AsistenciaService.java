package com.educacion.notasasistencia.service;

import com.educacion.notasasistencia.entity.Asistencia;
import java.util.List;

public interface AsistenciaService {
    Asistencia create(Asistencia asistencia);

    Asistencia getById(Long id);

    List<Asistencia> getAll();

    Asistencia update(Long id, Asistencia asistencia);

    List<Asistencia> getByProfesorId(Long profesorId);

    void delete(Long id);
}