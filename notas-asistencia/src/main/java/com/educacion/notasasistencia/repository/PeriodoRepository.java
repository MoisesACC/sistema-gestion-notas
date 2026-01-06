package com.educacion.notasasistencia.repository;

import com.educacion.notasasistencia.entity.Periodo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeriodoRepository extends JpaRepository<Periodo, Long> {
}