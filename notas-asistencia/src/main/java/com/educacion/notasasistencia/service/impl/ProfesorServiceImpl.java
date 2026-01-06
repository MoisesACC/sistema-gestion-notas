package com.educacion.notasasistencia.service.impl;

import com.educacion.notasasistencia.entity.Profesor;
import com.educacion.notasasistencia.repository.ProfesorRepository;
import com.educacion.notasasistencia.service.ProfesorService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfesorServiceImpl implements ProfesorService {

    private final ProfesorRepository profesorRepository;

    @Override
    @Transactional
    public Profesor create(Profesor profesor) {
        return profesorRepository.save(profesor);
    }

    @Override
    public Profesor getById(Long id) {
        return profesorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Profesor no encontrado con ID: " + id));
    }

    @Override
    public List<Profesor> getAll() {
        return profesorRepository.findAll();
    }

    @Override
    @Transactional
    public Profesor update(Long id, Profesor profesorDetails) {
        Profesor existing = getById(id);
        existing.setNumeroEmpleado(profesorDetails.getNumeroEmpleado());
        existing.setEmail(profesorDetails.getEmail());
        existing.setEspecialidad(profesorDetails.getEspecialidad());
        existing.setDepartamento(profesorDetails.getDepartamento());
        return profesorRepository.save(existing);
    }

    @Override
    public Profesor getByEmail(String email) {
        return profesorRepository.findByEmail(email)
                .orElse(null);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!profesorRepository.existsById(id)) {
            throw new EntityNotFoundException("Profesor no encontrado con ID: " + id);
        }
        profesorRepository.deleteById(id);
    }
}