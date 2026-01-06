package com.educacion.notasasistencia.service;

import com.educacion.notasasistencia.entity.Periodo;
import java.util.List;

public interface PeriodoService {
    Periodo create(Periodo periodo);
    Periodo getById(Long id);
    List<Periodo> getAll();
    Periodo update(Long id, Periodo periodo);
    void delete(Long id);
}