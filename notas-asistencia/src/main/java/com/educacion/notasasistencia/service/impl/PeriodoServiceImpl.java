package com.educacion.notasasistencia.service.impl;

import com.educacion.notasasistencia.entity.Periodo;
import com.educacion.notasasistencia.repository.PeriodoRepository;
import com.educacion.notasasistencia.service.PeriodoService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PeriodoServiceImpl implements PeriodoService {

    private final PeriodoRepository periodoRepository;

    @Override
    @Transactional
    public Periodo create(Periodo periodo) {
        return periodoRepository.save(periodo);
    }

    @Override
    public Periodo getById(Long id) {
        return periodoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Periodo no encontrado con ID: " + id));
    }

    @Override
    public List<Periodo> getAll() {
        return periodoRepository.findAll();
    }

    @Override
    @Transactional
    public Periodo update(Long id, Periodo periodoDetails) {
        Periodo existing = getById(id);
        existing.setNombre(periodoDetails.getNombre());
        existing.setFechaInicio(periodoDetails.getFechaInicio());
        existing.setFechaFin(periodoDetails.getFechaFin());
        existing.setAnio(periodoDetails.getAnio());
        return periodoRepository.save(existing);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!periodoRepository.existsById(id)) {
            throw new EntityNotFoundException("Periodo no encontrado con ID: " + id);
        }
        periodoRepository.deleteById(id);
    }
}