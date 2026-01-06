package com.educacion.notasasistencia.controller;

import com.educacion.notasasistencia.entity.Profesor;
import com.educacion.notasasistencia.service.ProfesorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profesores")
@RequiredArgsConstructor
public class ProfesorController {

    private final ProfesorService profesorService;

    @PostMapping
    public ResponseEntity<Profesor> create(@Valid @RequestBody Profesor profesor) {
        return new ResponseEntity<>(profesorService.create(profesor), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profesor> getById(@PathVariable Long id) {
        return ResponseEntity.ok(profesorService.getById(id));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Profesor> getByEmail(@PathVariable String email) {
        return ResponseEntity.ok(profesorService.getByEmail(email));
    }

    @GetMapping
    public ResponseEntity<List<Profesor>> getAll() {
        return ResponseEntity.ok(profesorService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profesor> update(@PathVariable Long id, @Valid @RequestBody Profesor profesor) {
        return ResponseEntity.ok(profesorService.update(id, profesor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        profesorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}