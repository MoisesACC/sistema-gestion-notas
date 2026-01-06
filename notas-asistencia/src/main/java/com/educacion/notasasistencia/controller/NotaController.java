package com.educacion.notasasistencia.controller;

import com.educacion.notasasistencia.entity.Nota;
import com.educacion.notasasistencia.service.NotaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
@RequiredArgsConstructor
public class NotaController {

    private final NotaService notaService;

    @PostMapping
    public ResponseEntity<Nota> create(@Valid @RequestBody Nota nota) {
        return new ResponseEntity<>(notaService.create(nota), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nota> getById(@PathVariable Long id) {
        return ResponseEntity.ok(notaService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Nota>> getAll(@RequestParam(required = false) Long profesorId) {
        if (profesorId != null) {
            return ResponseEntity.ok(notaService.getByProfesorId(profesorId));
        }
        return ResponseEntity.ok(notaService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nota> update(@PathVariable Long id, @Valid @RequestBody Nota nota) {
        return ResponseEntity.ok(notaService.update(id, nota));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        notaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}