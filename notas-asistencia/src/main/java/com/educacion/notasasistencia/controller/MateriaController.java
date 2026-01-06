package com.educacion.notasasistencia.controller;

import com.educacion.notasasistencia.entity.Materia;
import com.educacion.notasasistencia.service.MateriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materias")
@RequiredArgsConstructor
public class MateriaController {

    private final MateriaService materiaService;

    @PostMapping
    public ResponseEntity<Materia> create(@Valid @RequestBody Materia materia) {
        return new ResponseEntity<>(materiaService.create(materia), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> getById(@PathVariable Long id) {
        return ResponseEntity.ok(materiaService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Materia>> getAll(@RequestParam(required = false) Long profesorId) {
        if (profesorId != null) {
            return ResponseEntity.ok(materiaService.getByProfesorId(profesorId));
        }
        return ResponseEntity.ok(materiaService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Materia> update(@PathVariable Long id, @Valid @RequestBody Materia materia) {
        return ResponseEntity.ok(materiaService.update(id, materia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        materiaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}