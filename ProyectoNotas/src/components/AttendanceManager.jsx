import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, Calendar, CheckCircle2, Clock, XCircle, Search, Filter } from 'lucide-react';
import api from '../api/api';

const AttendanceManager = () => {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [attendanceList, setAttendanceList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teacherId, setTeacherId] = useState(null);
    const [user] = useState(JSON.parse(localStorage.getItem('user') || '{}'));

    useEffect(() => {
        const loadData = async () => {
            try {
                let currentTeacherId = null;
                if (user.rol === 'PROFESOR') {
                    const profRes = await api.get(`/profesores/email/${user.email}`);
                    currentTeacherId = profRes.data?.id;
                    setTeacherId(currentTeacherId);
                }

                const [studentsRes, subjectsRes, attendanceRes] = await Promise.all([
                    api.get('/estudiantes'),
                    api.get(currentTeacherId ? `/materias?profesorId=${currentTeacherId}` : '/materias'),
                    api.get(currentTeacherId ? `/asistencias?profesorId=${currentTeacherId}` : '/asistencias')
                ]);

                setStudents(studentsRes.data);
                setSubjects(subjectsRes.data);
                setAttendanceList(attendanceRes.data);
                if (subjectsRes.data.length > 0) setSelectedSubject(subjectsRes.data[0].id);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [user]);

    const markAttendance = async (studentId, status) => {
        try {
            const payload = {
                estudiante: { id: studentId },
                materia: { id: selectedSubject },
                fecha: new Date().toISOString().split('T')[0],
                estado: status,
                observacion: 'Registro diario'
            };
            await api.post('/asistencias', payload);
            // Refresh history with filter
            const res = await api.get(teacherId ? `/asistencias?profesorId=${teacherId}` : '/asistencias');
            setAttendanceList(res.data);
        } catch (error) {
            console.error('Error marking attendance:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '32px' }}>
                {/* Manual Marking */}
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ClipboardCheck className="text-gradient" /> Control de Asistencia
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <Calendar size={16} /> {new Date().toLocaleDateString()}
                        </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Seleccionar Materia</label>
                        <select
                            className="modern-input"
                            style={{ maxWidth: '400px' }}
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            {subjects.map(s => (
                                <option key={s.id} value={s.id}>{s.nombre} - {s.grado}{s.seccion}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {students.length === 0 ? <p>No hay estudiantes registrados.</p> : students.map((student, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={student.id}
                                className="glass"
                                style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>{student.nombre}</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{student.numeroMatricula}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => markAttendance(student.id, 'PRESENTE')}
                                        className="btn-attendance" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                        <CheckCircle2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => markAttendance(student.id, 'TARDANZA')}
                                        className="btn-attendance" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                                        <Clock size={18} />
                                    </button>
                                    <button
                                        onClick={() => markAttendance(student.id, 'AUSENTE')}
                                        className="btn-attendance" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                                        <XCircle size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Recent History */}
                <div className="glass-card">
                    <h3 style={{ marginBottom: '24px' }}>Últimos Registros</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {attendanceList.length === 0 ? (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No hay registros para este profesor.</p>
                        ) : attendanceList.slice(-8).reverse().map((record) => (
                            <div key={record.id} style={{
                                padding: '12px', borderRadius: '12px', borderLeft: `4px solid ${record.estado === 'PRESENTE' ? '#10b981' : record.estado === 'TARDANZA' ? '#f59e0b' : '#ef4444'
                                    }`,
                                background: 'rgba(255,255,255,0.02)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{record.estudiante?.nombre}</span>
                                    <span style={{
                                        fontSize: '0.7rem', fontWeight: 'bold',
                                        color: record.estado === 'PRESENTE' ? '#10b981' : record.estado === 'TARDANZA' ? '#f59e0b' : '#ef4444'
                                    }}>{record.estado}</span>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                    {record.materia?.nombre} | {record.fecha}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .btn-attendance {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    alignItems: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }
                .btn-attendance:hover {
                    transform: scale(1.1);
                    filter: brightness(1.2);
                }
            `}</style>
        </div>
    );
};

export default AttendanceManager;
