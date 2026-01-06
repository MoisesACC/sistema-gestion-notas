package com.educacion.notasasistencia.service;

import com.educacion.notasasistencia.entity.Padre;
import java.util.List;

public interface PadreService {
    Padre create(Padre padre);
    Padre getById(Long id);
    List<Padre> getAll();
    Padre update(Long id, Padre padre);
    void delete(Long id);
}