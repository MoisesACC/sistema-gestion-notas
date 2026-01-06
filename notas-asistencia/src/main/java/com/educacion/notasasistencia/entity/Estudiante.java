package com.educacion.notasasistencia.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "estudiantes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numeroMatricula;

    private String nombre;

    private String email;

    private String grado;

    private String seccion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "padre_id")
    private Padre padre;
}