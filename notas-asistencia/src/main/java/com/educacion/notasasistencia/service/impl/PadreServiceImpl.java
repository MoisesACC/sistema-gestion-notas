package com.educacion.notasasistencia.service.impl;

import com.educacion.notasasistencia.entity.Padre;
import com.educacion.notasasistencia.repository.PadreRepository;
import com.educacion.notasasistencia.service.PadreService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PadreServiceImpl implements PadreService {

    private final PadreRepository padreRepository;

    @Override
    @Transactional
    public Padre create(Padre padre) {
        return padreRepository.save(padre);
    }

    @Override
    public Padre getById(Long id) {
        return padreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Padre no encontrado con ID: " + id));
    }

    @Override
    public List<Padre> getAll() {
        return padreRepository.findAll();
    }

    @Override
    @Transactional
    public Padre update(Long id, Padre padreDetails) {
        Padre existing = getById(id);
        existing.setTelefonoContacto(padreDetails.getTelefonoContacto());
        existing.setDireccion(padreDetails.getDireccion());
        return padreRepository.save(existing);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!padreRepository.existsById(id)) {
            throw new EntityNotFoundException("Padre no encontrado con ID: " + id);
        }
        padreRepository.deleteById(id);
    }
}