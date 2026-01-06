package com.educacion.notasasistencia.repository;

import com.educacion.notasasistencia.entity.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotaRepository extends JpaRepository<Nota, Long> {
    List<Nota> findByMateriaProfesorId(Long profesorId);
}