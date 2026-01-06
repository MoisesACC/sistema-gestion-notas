package com.educacion.notasasistencia.controller;

import com.educacion.notasasistencia.entity.Padre;
import com.educacion.notasasistencia.service.PadreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/padres")
@RequiredArgsConstructor
public class PadreController {

    private final PadreService padreService;

    @PostMapping
    public ResponseEntity<Padre> create(@Valid @RequestBody Padre padre) {
        return new ResponseEntity<>(padreService.create(padre), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Padre> getById(@PathVariable Long id) {
        return ResponseEntity.ok(padreService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Padre>> getAll() {
        return ResponseEntity.ok(padreService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Padre> update(@PathVariable Long id, @Valid @RequestBody Padre padre) {
        return ResponseEntity.ok(padreService.update(id, padre));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        padreService.delete(id);
        return ResponseEntity.noContent().build();
    }
}