package com.educacion.notasasistencia.repository;

import com.educacion.notasasistencia.entity.Asistencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {
    List<Asistencia> findByMateriaProfesorId(Long profesorId);
}