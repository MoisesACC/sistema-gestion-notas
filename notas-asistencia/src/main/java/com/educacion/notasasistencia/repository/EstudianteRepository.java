package com.educacion.notasasistencia.repository;

import com.educacion.notasasistencia.entity.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
}