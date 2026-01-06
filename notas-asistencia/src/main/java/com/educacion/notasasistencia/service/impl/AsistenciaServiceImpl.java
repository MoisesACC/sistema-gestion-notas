package com.educacion.notasasistencia.service.impl;

import com.educacion.notasasistencia.entity.Asistencia;
import com.educacion.notasasistencia.repository.AsistenciaRepository;
import com.educacion.notasasistencia.service.AsistenciaService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AsistenciaServiceImpl implements AsistenciaService {

    private final AsistenciaRepository asistenciaRepository;

    @Override
    @Transactional
    public Asistencia create(Asistencia asistencia) {
        return asistenciaRepository.save(asistencia);
    }

    @Override
    public Asistencia getById(Long id) {
        return asistenciaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asistencia no encontrada con ID: " + id));
    }

    @Override
    public List<Asistencia> getAll() {
        return asistenciaRepository.findAll();
    }

    @Override
    @Transactional
    public Asistencia update(Long id, Asistencia asistenciaDetails) {
        Asistencia existing = getById(id);
        existing.setEstudiante(asistenciaDetails.getEstudiante());
        existing.setMateria(asistenciaDetails.getMateria());
        existing.setFecha(asistenciaDetails.getFecha());
        existing.setEstado(asistenciaDetails.getEstado());
        existing.setObservacion(asistenciaDetails.getObservacion());
        return asistenciaRepository.save(existing);
    }

    @Override
    public List<Asistencia> getByProfesorId(Long profesorId) {
        return asistenciaRepository.findByMateriaProfesorId(profesorId);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!asistenciaRepository.existsById(id)) {
            throw new EntityNotFoundException("Asistencia no encontrada con ID: " + id);
        }
        asistenciaRepository.deleteById(id);
    }
}