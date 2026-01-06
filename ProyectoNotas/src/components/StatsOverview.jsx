import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../api/api';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="glass-card" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: `${color}20`, color: color,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <Icon size={24} />
        </div>
        <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginTop: '4px' }}>{value}</h3>
        </div>
    </div>
);

const StatsOverview = () => {
    const [stats, setStats] = useState({
        students: 0,
        subjects: 0,
        attendance: '0%',
        tasks: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [studentsRes, subjectsRes] = await Promise.all([
                    api.get('/estudiantes'),
                    api.get('/materias')
                ]);
                setStats({
                    students: studentsRes.data.length,
                    subjects: subjectsRes.data.length,
                    attendance: '98.5%', // Mocked for now as attendance logic is complex
                    tasks: 5
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', gap: '24px' }}>
                <StatCard icon={Users} label="Total Estudiantes" value={stats.students.toString()} color="#8b5cf6" />
                <StatCard icon={BookOpen} label="Materias Activas" value={stats.subjects.toString()} color="#3b82f6" />
                <StatCard icon={CheckCircle} label="Asistencia Hoy" value={stats.attendance} color="#10b981" />
                <StatCard icon={AlertCircle} label="Tareas Pendientes" value={stats.tasks.toString()} color="#f59e0b" />
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
                <div className="glass-card" style={{ flex: 2 }}>
                    <h3 style={{ marginBottom: '20px' }}>Rendimiento Académico</h3>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '10px' }}>
                        {[60, 80, 45, 90, 70, 85].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.1, duration: 1 }}
                                style={{
                                    width: '40px',
                                    background: 'linear-gradient(to top, var(--accent-primary), var(--accent-secondary))',
                                    borderRadius: '8px 8px 4px 4px',
                                    opacity: 0.8
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className="glass-card" style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '20px' }}>Eventos Próximos</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-secondary)' }}></div>
                            <p style={{ fontSize: '0.9rem' }}>Examen de Matemáticas</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                            <p style={{ fontSize: '0.9rem' }}>Entrega de Proyecto</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;
