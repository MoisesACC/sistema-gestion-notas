package com.educacion.notasasistencia.controller;

import com.educacion.notasasistencia.entity.Asistencia;
import com.educacion.notasasistencia.service.AsistenciaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asistencias")
@RequiredArgsConstructor
public class AsistenciaController {

    private final AsistenciaService asistenciaService;

    @PostMapping
    public ResponseEntity<Asistencia> create(@Valid @RequestBody Asistencia asistencia) {
        return new ResponseEntity<>(asistenciaService.create(asistencia), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asistencia> getById(@PathVariable Long id) {
        return ResponseEntity.ok(asistenciaService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Asistencia>> getAll(@RequestParam(required = false) Long profesorId) {
        if (profesorId != null) {
            return ResponseEntity.ok(asistenciaService.getByProfesorId(profesorId));
        }
        return ResponseEntity.ok(asistenciaService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asistencia> update(@PathVariable Long id, @Valid @RequestBody Asistencia asistencia) {
        return ResponseEntity.ok(asistenciaService.update(id, asistencia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        asistenciaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}