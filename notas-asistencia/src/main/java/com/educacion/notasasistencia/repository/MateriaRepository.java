package com.educacion.notasasistencia.repository;

import com.educacion.notasasistencia.entity.Materia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MateriaRepository extends JpaRepository<Materia, Long> {
    List<Materia> findByProfesorId(Long profesorId);
}