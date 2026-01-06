package com.educacion.notasasistencia.service.impl;

import com.educacion.notasasistencia.entity.Materia;
import com.educacion.notasasistencia.repository.MateriaRepository;
import com.educacion.notasasistencia.service.MateriaService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MateriaServiceImpl implements MateriaService {

    private final MateriaRepository materiaRepository;

    @Override
    @Transactional
    public Materia create(Materia materia) {
        return materiaRepository.save(materia);
    }

    @Override
    public Materia getById(Long id) {
        return materiaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Materia no encontrada con ID: " + id));
    }

    @Override
    public List<Materia> getAll() {
        return materiaRepository.findAll();
    }

    @Override
    @Transactional
    public Materia update(Long id, Materia materiaDetails) {
        Materia existing = getById(id);
        existing.setNombre(materiaDetails.getNombre());
        existing.setCodigo(materiaDetails.getCodigo());
        existing.setGrado(materiaDetails.getGrado());
        existing.setSeccion(materiaDetails.getSeccion());
        existing.setProfesor(materiaDetails.getProfesor());
        return materiaRepository.save(existing);
    }

    @Override
    public List<Materia> getByProfesorId(Long profesorId) {
        return materiaRepository.findByProfesorId(profesorId);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!materiaRepository.existsById(id)) {
            throw new EntityNotFoundException("Materia no encontrada con ID: " + id);
        }
        materiaRepository.deleteById(id);
    }
}