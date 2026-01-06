package com.educacion.notasasistencia.config;

import com.educacion.notasasistencia.entity.*;
import com.educacion.notasasistencia.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.UUID;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UsuarioRepository usuarioRepository;
    private final EstudianteRepository estudianteRepository;
    private final MateriaRepository materiaRepository;
    private final ProfesorRepository profesorRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            if (usuarioRepository.count() == 0) {
                // 1. Create Professors and Users
                createProfesoresAndUsers();

                // 2. Create Students
                createStudents();

                // 3. Create Subjects linked to Professors
                createSubjects();

                System.out.println("✅ Real-world Educational Data Initialized Successfully.");
            }
        };
    }

    private void createProfesoresAndUsers() {
        String[] nombres = { "Carlos Rodriguez", "Ana Martinez", "Luis Garcia", "Elena Pineda" };
        String[] emails = { "carlos.rod@edunotes.com", "ana.mtz@edunotes.com", "luis.garcia@edunotes.com",
                "elena.pin@edunotes.com" };
        String[] especialidades = { "Matemáticas", "Lenguaje", "Ciencias", "Historia" };

        // Create Admin
        usuarioRepository.save(Usuario.builder()
                .id(UUID.randomUUID().toString())
                .nombre("Admin Pro")
                .email("admin@edunotes.com")
                .contrasena(passwordEncoder.encode("password123"))
                .rol("ADMIN")
                .activo(true)
                .build());

        for (int i = 0; i < nombres.length; i++) {
            // Create user
            usuarioRepository.save(Usuario.builder()
                    .id(UUID.randomUUID().toString())
                    .nombre(nombres[i])
                    .email(emails[i])
                    .contrasena(passwordEncoder.encode("password123"))
                    .rol("PROFESOR")
                    .activo(true)
                    .build());

            // Create professor linked by email
            profesorRepository.save(Profesor.builder()
                    .numeroEmpleado(202600 + i)
                    .email(emails[i])
                    .especialidad(especialidades[i])
                    .departamento(especialidades[i] + " Dept")
                    .build());
        }
    }

    private void createStudents() {
        String[] nombres = { "Mateo Sebastian Lopez", "Valentina Sofia Ortiz", "Santiago Andre Diaz",
                "Isabella Lucia Silva", "Sebastian Vega", "Lucia Mendez", "Diego Torres", "Mariana Ximena Rios",
                "Nicolas Gabriel Jara", "Camila Alejandra Soto" };
        for (int i = 0; i < nombres.length; i++) {
            estudianteRepository.save(Estudiante.builder()
                    .numeroMatricula("MAT-2026-" + String.format("%03d", i + 1))
                    .nombre(nombres[i])
                    .email(nombres[i].toLowerCase().replace(" ", ".") + "@student.com")
                    .grado("10")
                    .seccion(i < 5 ? "A" : "B")
                    .build());
        }
    }

    private void createSubjects() {
        List<Profesor> profs = profesorRepository.findAll();
        String[] materias = { "Cálculo I", "Cálculo II", "Literatura I", "Biología Avanzada", "Historia del Perú" };

        for (int i = 0; i < profs.size() && i < materias.length; i++) {
            materiaRepository.save(Materia.builder()
                    .nombre(materias[i])
                    .codigo("SUB-2026-" + (100 + i))
                    .grado("10")
                    .seccion("A")
                    .profesor(profs.get(i))
                    .build());
        }
    }
}
