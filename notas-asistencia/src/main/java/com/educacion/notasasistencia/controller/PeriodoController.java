package com.educacion.notasasistencia.controller;

import com.educacion.notasasistencia.entity.Periodo;
import com.educacion.notasasistencia.service.PeriodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/periodos")
@RequiredArgsConstructor
public class PeriodoController {

    private final PeriodoService periodoService;

    @PostMapping
    public ResponseEntity<Periodo> create(@Valid @RequestBody Periodo periodo) {
        return new ResponseEntity<>(periodoService.create(periodo), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Periodo> getById(@PathVariable Long id) {
        return ResponseEntity.ok(periodoService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Periodo>> getAll() {
        return ResponseEntity.ok(periodoService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Periodo> update(@PathVariable Long id, @Valid @RequestBody Periodo periodo) {
        return ResponseEntity.ok(periodoService.update(id, periodo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        periodoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}