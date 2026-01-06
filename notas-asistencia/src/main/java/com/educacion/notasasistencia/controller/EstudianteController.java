package com.educacion.notasasistencia.controller;

import com.educacion.notasasistencia.entity.Estudiante;
import com.educacion.notasasistencia.service.EstudianteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
@RequiredArgsConstructor
public class EstudianteController {

    private final EstudianteService estudianteService;

    @PostMapping
    public ResponseEntity<Estudiante> create(@Valid @RequestBody Estudiante estudiante) {
        return new ResponseEntity<>(estudianteService.create(estudiante), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> getById(@PathVariable Long id) {
        return ResponseEntity.ok(estudianteService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Estudiante>> getAll() {
        return ResponseEntity.ok(estudianteService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estudiante> update(@PathVariable Long id, @Valid @RequestBody Estudiante estudiante) {
        return ResponseEntity.ok(estudianteService.update(id, estudiante));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        estudianteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}