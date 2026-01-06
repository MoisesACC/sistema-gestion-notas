import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        contrasena: '',
        rol: 'PROFESOR', // Default role
        activo: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Assuming the backend expects an ID, names, etc. 
            // Based on Usuario.java, it uses a String ID (likely UUID)
            const userData = {
                ...formData,
                id: crypto.randomUUID(), // Generate a client-side ID if backend doesn't handle it
            };

            await api.post('/usuarios', userData);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError('Error al registrar usuario. El email podría ya estar en uso.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '1rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ width: '100%', maxWidth: '450px' }}
            >
                <button
                    onClick={() => navigate('/login')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer',
                        marginBottom: '1rem'
                    }}
                >
                    <ArrowLeft size={16} /> Volver al login
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Crear Cuenta</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Únete a la nueva era de gestión académica</p>
                </div>

                {success ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ textAlign: 'center', padding: '2rem' }}
                    >
                        <div style={{
                            width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)',
                            color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                        }}>
                            <ShieldCheck size={32} />
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>¡Registro Exitoso!</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Redirigiéndote al inicio de sesión...</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={14} /> Nombre Completo
                            </label>
                            <input
                                name="nombre"
                                type="text"
                                className="modern-input"
                                placeholder="Ej. Dr. Alexander Pierce"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={14} /> Correo Electrónico
                            </label>
                            <input
                                name="email"
                                type="email"
                                className="modern-input"
                                placeholder="correo@ejemplo.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Lock size={14} /> Contraseña
                            </label>
                            <input
                                name="contrasena"
                                type="password"
                                className="modern-input"
                                placeholder="••••••••"
                                value={formData.contrasena}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Rol del Usuario
                            </label>
                            <select
                                name="rol"
                                className="modern-input"
                                value={formData.rol}
                                onChange={handleChange}
                                style={{ appearance: 'none' }}
                            >
                                <option value="PROFESOR">Profesor</option>
                                <option value="ADMIN">Administrador</option>
                                <option value="ESTUDIANTE">Estudiante</option>
                            </select>
                        </div>

                        {error && <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</p>}

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                            style={{ marginTop: '0.5rem' }}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Registrarme ahora'}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Register;
