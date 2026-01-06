import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Plus, Trash2, TrendingUp, Calculator, Save } from 'lucide-react';
import api from '../api/api';

const GradesManager = () => {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teacherId, setTeacherId] = useState(null);
    const [user] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
    const [formData, setFormData] = useState({
        estudianteId: '',
        materiaId: '',
        periodo: 'Trimestre 1',
        nota1: '',
        nota2: '',
        nota3: ''
    });

    useEffect(() => {
        fetchInitialData();
    }, [user]);

    const fetchInitialData = async () => {
        try {
            let currentTeacherId = null;
            if (user.rol === 'PROFESOR') {
                const profRes = await api.get(`/profesores/email/${user.email}`);
                currentTeacherId = profRes.data?.id;
                setTeacherId(currentTeacherId);
            }

            const [studentsRes, subjectsRes, gradesRes] = await Promise.all([
                api.get('/estudiantes'),
                api.get(currentTeacherId ? `/materias?profesorId=${currentTeacherId}` : '/materias'),
                api.get(currentTeacherId ? `/notas?profesorId=${currentTeacherId}` : '/notas')
            ]);
            setStudents(studentsRes.data);
            setSubjects(subjectsRes.data);
            setGrades(gradesRes.data);

            if (studentsRes.data.length > 0) setFormData(prev => ({ ...prev, estudianteId: studentsRes.data[0].id }));
            if (subjectsRes.data.length > 0) setFormData(prev => ({ ...prev, materiaId: subjectsRes.data[0].id }));
        } catch (error) {
            console.error('Error fetching grades data:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateAverage = (n1, n2, n3) => {
        const sum = (parseFloat(n1) || 0) + (parseFloat(n2) || 0) + (parseFloat(n3) || 0);
        return ((sum) / 3).toFixed(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const promedio = calculateAverage(formData.nota1, formData.nota2, formData.nota3);
        try {
            const payload = {
                estudiante: { id: formData.estudianteId },
                materia: { id: formData.materiaId },
                periodo: formData.periodo,
                nota1: parseFloat(formData.nota1) || 0,
                nota2: parseFloat(formData.nota2) || 0,
                nota3: parseFloat(formData.nota3) || 0,
                promedio: parseFloat(promedio)
            };
            await api.post('/notas', payload);
            setFormData({ ...formData, nota1: '', nota2: '', nota3: '' });
            fetchInitialData();
            alert('Calificación guardada');
        } catch (error) {
            console.error('Error creating grade:', error);
            alert('Error al guardar calificación');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar calificación?')) {
            try {
                await api.delete(`/notas/${id}`);
                fetchInitialData();
            } catch (error) {
                console.error('Error deleting grade:', error);
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Sistema de Evaluación Real</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Cada profesor gestiona sus propias calificaciones independientes.</p>
                </div>
                <Calculator size={48} className="text-gradient" style={{ opacity: 0.5 }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
                {/* Entry Form */}
                <div className="glass-card">
                    <h3 style={{ marginBottom: '24px' }}>Cargar Notas</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Estudiante</label>
                            <select
                                className="modern-input"
                                value={formData.estudianteId}
                                onChange={(e) => setFormData({ ...formData, estudianteId: e.target.value })}
                            >
                                {students.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Materia</label>
                            <select
                                className="modern-input"
                                value={formData.materiaId}
                                onChange={(e) => setFormData({ ...formData, materiaId: e.target.value })}
                            >
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.nombre} - {s.grado}{s.seccion}</option>)}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Nota 1</label>
                                <input type="number" step="0.1" max="20" min="0" className="modern-input" value={formData.nota1}
                                    onChange={(e) => setFormData({ ...formData, nota1: e.target.value })} placeholder="0.0" />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Nota 2</label>
                                <input type="number" step="0.1" max="20" min="0" className="modern-input" value={formData.nota2}
                                    onChange={(e) => setFormData({ ...formData, nota2: e.target.value })} placeholder="0.0" />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Nota 3</label>
                                <input type="number" step="0.1" max="20" min="0" className="modern-input" value={formData.nota3}
                                    onChange={(e) => setFormData({ ...formData, nota3: e.target.value })} placeholder="0.0" />
                            </div>
                        </div>

                        <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', textAlign: 'center' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Promedio Estimado:</span>
                            <h2 style={{ color: 'var(--accent-primary)', margin: '4px 0' }}>
                                {calculateAverage(formData.nota1, formData.nota2, formData.nota3)}
                            </h2>
                        </div>

                        <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                            <Save size={18} /> Guardar Evaluación
                        </button>
                    </form>
                </div>

                {/* Grades Table */}
                <div className="glass-card">
                    <h3 style={{ marginBottom: '24px' }}>Historial Académico Detallado</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--glass-border)' }}>
                                    <th style={{ padding: '12px' }}>Alumno</th>
                                    <th style={{ padding: '12px' }}>Materia</th>
                                    <th style={{ padding: '12px' }}>N1</th>
                                    <th style={{ padding: '12px' }}>N2</th>
                                    <th style={{ padding: '12px' }}>N3</th>
                                    <th style={{ padding: '12px' }}>Prom</th>
                                    <th style={{ padding: '12px' }}>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                            No hay calificaciones registradas por usted.
                                        </td>
                                    </tr>
                                ) : grades.map((g, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={g.id}
                                        style={{ borderBottom: '1px solid var(--glass-border)' }}
                                    >
                                        <td style={{ padding: '12px', fontSize: '0.85rem' }}>{g.estudiante?.nombre}</td>
                                        <td style={{ padding: '12px', fontSize: '0.85rem' }}>{g.materia?.nombre}</td>
                                        <td style={{ padding: '12px', fontSize: '0.9rem' }}>{g.nota1}</td>
                                        <td style={{ padding: '12px', fontSize: '0.9rem' }}>{g.nota2}</td>
                                        <td style={{ padding: '12px', fontSize: '0.9rem' }}>{g.nota3}</td>
                                        <td style={{ padding: '12px' }}>
                                            <span style={{
                                                padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold',
                                                background: g.promedio >= 11 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: g.promedio >= 11 ? '#10b981' : '#ef4444'
                                            }}>
                                                {g.promedio.toFixed(1)}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <button
                                                onClick={() => handleDelete(g.id)}
                                                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradesManager;
