package com.educacion.notasasistencia.service.impl;

import com.educacion.notasasistencia.entity.Estudiante;
import com.educacion.notasasistencia.repository.EstudianteRepository;
import com.educacion.notasasistencia.service.EstudianteService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EstudianteServiceImpl implements EstudianteService {

    private final EstudianteRepository estudianteRepository;

    @Override
    @Transactional
    public Estudiante create(Estudiante estudiante) {
        // Note: Validation of parent existence would ideally happen here or via FK
        // constraints
        return estudianteRepository.save(estudiante);
    }

    @Override
    public Estudiante getById(Long id) {
        return estudianteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Estudiante no encontrado con ID: " + id));
    }

    @Override
    public List<Estudiante> getAll() {
        return estudianteRepository.findAll();
    }

    @Override
    @Transactional
    public Estudiante update(Long id, Estudiante estudianteDetails) {
        Estudiante existing = getById(id);
        existing.setNumeroMatricula(estudianteDetails.getNumeroMatricula());
        existing.setNombre(estudianteDetails.getNombre());
        existing.setEmail(estudianteDetails.getEmail());
        existing.setGrado(estudianteDetails.getGrado());
        existing.setSeccion(estudianteDetails.getSeccion());
        existing.setPadre(estudianteDetails.getPadre());
        return estudianteRepository.save(existing);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!estudianteRepository.existsById(id)) {
            throw new EntityNotFoundException("Estudiante no encontrado con ID: " + id);
        }
        estudianteRepository.deleteById(id);
    }
}