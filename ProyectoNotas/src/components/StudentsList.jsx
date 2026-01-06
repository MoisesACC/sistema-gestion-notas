import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Edit2, Trash2, X, Check, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/api';

const StudentsList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        numeroMatricula: '',
        grado: '',
        seccion: ''
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await api.get('/estudiantes');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (student = null) => {
        if (student) {
            setCurrentStudent(student);
            setFormData({
                nombre: student.nombre || '',
                email: student.email || '',
                numeroMatricula: student.numeroMatricula || '',
                grado: student.grado || '',
                seccion: student.seccion || ''
            });
        } else {
            setCurrentStudent(null);
            setFormData({
                nombre: '',
                email: '',
                numeroMatricula: '',
                grado: '',
                seccion: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentStudent) {
                await api.put(`/estudiantes/${currentStudent.id}`, formData);
            } else {
                await api.post('/estudiantes', formData);
            }
            fetchStudents();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este estudiante?')) {
            try {
                await api.delete(`/estudiantes/${id}`);
                fetchStudents();
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    return (
        <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestión de Estudiantes</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Administra la base de datos real de alumnos.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="btn-primary" style={{ padding: '10px 20px' }}>
                    <UserPlus size={18} /> Nuevo Alumno
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                            <th style={{ padding: '16px' }}>Nombre Completo</th>
                            <th style={{ padding: '16px' }}>Email Inst.</th>
                            <th style={{ padding: '16px' }}>Matrícula</th>
                            <th style={{ padding: '16px' }}>Grado/Sec</th>
                            <th style={{ padding: '16px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {students.map((student) => (
                                <motion.tr
                                    key={student.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.3s' }}
                                >
                                    <td style={{ padding: '16px', fontWeight: '600' }}>{student.nombre}</td>
                                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{student.email}</td>
                                    <td style={{ padding: '16px', fontFamily: 'monospace' }}>{student.numeroMatricula}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 12px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-primary)', fontSize: '0.8rem'
                                        }}>
                                            {student.grado}-{student.seccion}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <button
                                                onClick={() => handleOpenModal(student)}
                                                style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer' }}
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(student.id)}
                                                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
                {loading && <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Sincronizando con base de datos...</p>}
                {!loading && students.length === 0 && <p style={{ textAlign: 'center', padding: '40px' }}>No hay estudiantes registrados.</p>}
            </div>

            {/* Modal for Add/Edit */}
            <AnimatePresence>
                {isModalOpen && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                        background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center',
                        alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(8px)'
                    }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-card"
                            style={{ width: '100%', maxWidth: '500px', padding: '32px' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                <h3>{currentStudent ? 'Editar Estudiante' : 'Nuevo Estudiante'}</h3>
                                <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                                    <X />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Nombre Completo</label>
                                    <input
                                        className="modern-input"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Email Institucional</label>
                                    <input
                                        className="modern-input"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Matrícula</label>
                                        <input
                                            className="modern-input"
                                            value={formData.numeroMatricula}
                                            onChange={(e) => setFormData({ ...formData, numeroMatricula: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Grado</label>
                                        <input
                                            className="modern-input"
                                            value={formData.grado}
                                            onChange={(e) => setFormData({ ...formData, grado: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sección</label>
                                    <input
                                        className="modern-input"
                                        value={formData.seccion}
                                        onChange={(e) => setFormData({ ...formData, seccion: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>
                                    <Save size={18} /> Guardar Cambios
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentsList;
