package com.educacion.notasasistencia.service.impl;

import com.educacion.notasasistencia.entity.Nota;
import com.educacion.notasasistencia.repository.NotaRepository;
import com.educacion.notasasistencia.service.NotaService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotaServiceImpl implements NotaService {

    private final NotaRepository notaRepository;

    @Override
    @Transactional
    public Nota create(Nota nota) {
        calcularPromedio(nota);
        return notaRepository.save(nota);
    }

    @Override
    public Nota getById(Long id) {
        return notaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nota no encontrada con ID: " + id));
    }

    @Override
    public List<Nota> getAll() {
        return notaRepository.findAll();
    }

    @Override
    @Transactional
    public Nota update(Long id, Nota notaDetails) {
        Nota existing = getById(id);
        existing.setEstudiante(notaDetails.getEstudiante());
        existing.setMateria(notaDetails.getMateria());
        existing.setPeriodo(notaDetails.getPeriodo());
        existing.setNota1(notaDetails.getNota1());
        existing.setNota2(notaDetails.getNota2());
        existing.setNota3(notaDetails.getNota3());
        calcularPromedio(existing);
        return notaRepository.save(existing);
    }

    private void calcularPromedio(Nota nota) {
        double n1 = nota.getNota1() != null ? nota.getNota1() : 0;
        double n2 = nota.getNota2() != null ? nota.getNota2() : 0;
        double n3 = nota.getNota3() != null ? nota.getNota3() : 0;
        nota.setPromedio((n1 + n2 + n3) / 3.0);
    }

    @Override
    public List<Nota> getByProfesorId(Long profesorId) {
        return notaRepository.findByMateriaProfesorId(profesorId);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!notaRepository.existsById(id)) {
            throw new EntityNotFoundException("Nota no encontrada con ID: " + id);
        }
        notaRepository.deleteById(id);
    }
}