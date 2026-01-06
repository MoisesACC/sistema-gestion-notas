import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    ClipboardCheck,
    LogOut,
    Bell,
    Search,
    ChevronDown,
    User,
    Settings,
    Save
} from 'lucide-react';
import StudentsList from '../components/StudentsList';
import StatsOverview from '../components/StatsOverview';
import AttendanceManager from '../components/AttendanceManager';
import GradesManager from '../components/GradesManager';
import api from '../api/api';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            cursor: 'pointer',
            backgroundColor: active ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
            color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
            transition: 'all 0.3s ease'
        }}
    >
        <Icon size={20} />
        <span style={{ fontWeight: active ? '600' : '400' }}>{label}</span>
        {active && (
            <motion.div
                layoutId="active-pill"
                style={{ marginLeft: 'auto', width: '4px', height: '20px', background: 'var(--accent-primary)', borderRadius: '10px' }}
            />
        )}
    </div>
);

const Dashboard = ({ logout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [profileData, setProfileData] = useState(user);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <StatsOverview />;
            case 'students': return <StudentsList />;
            case 'attendance': return <AttendanceManager />;
            case 'grades': return <GradesManager />;
            default: return <StatsOverview />;
        }
    };

    const getTitle = () => {
        switch (activeTab) {
            case 'dashboard': return 'Resumen General';
            case 'students': return 'Gestión de Alumnos';
            case 'attendance': return 'Asistencia Diaria';
            case 'grades': return 'Control de Calificaciones';
            default: return 'EduNotes Pro';
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/usuarios/${user.id}`, profileData);
            setUser(profileData);
            localStorage.setItem('user', JSON.stringify(profileData));
            setIsProfileModalOpen(false);
            alert('Perfil actualizado con éxito');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error al actualizar perfil');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'transparent' }}>
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: isSidebarOpen ? 0 : -300 }}
                className="glass"
                style={{
                    width: '260px',
                    padding: '24px',
                    margin: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                    position: 'fixed',
                    height: 'calc(100vh - 32px)',
                    zIndex: 100
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <BookOpen color="white" size={24} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.5px' }}>EduNotes Pro</h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Dashboard"
                        active={activeTab === 'dashboard'}
                        onClick={() => setActiveTab('dashboard')}
                    />
                    <SidebarItem
                        icon={Users}
                        label="Estudiantes"
                        active={activeTab === 'students'}
                        onClick={() => setActiveTab('students')}
                    />
                    <SidebarItem
                        icon={ClipboardCheck}
                        label="Asistencia"
                        active={activeTab === 'attendance'}
                        onClick={() => setActiveTab('attendance')}
                    />
                    <SidebarItem
                        icon={BookOpen}
                        label="Calificaciones"
                        active={activeTab === 'grades'}
                        onClick={() => setActiveTab('grades')}
                    />
                </nav>

                <div style={{ paddingTop: '24px', borderTop: '1px solid var(--glass-border)' }}>
                    <SidebarItem icon={LogOut} label="Cerrar Sesión" onClick={logout} />
                </div>
            </motion.aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                marginLeft: isSidebarOpen ? '300px' : '0',
                padding: '32px',
                transition: 'margin-left 0.3s ease'
            }}>
                {/* Header */}
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '40px'
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                            {getTitle()}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Bienvenido, <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>{user.nombre}</span></p>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div className="glass" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Search size={18} color="var(--text-secondary)" />
                            <input
                                placeholder="Buscar globalmente..."
                                style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '200px', fontSize: '0.9rem' }}
                            />
                        </div>
                        <div className="glass" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
                            <Bell size={20} />
                            <div style={{ position: 'absolute', top: '10px', right: '12px', width: '8px', height: '8px', background: 'var(--accent-secondary)', borderRadius: '50%', border: '2px solid var(--bg-color)' }}></div>
                        </div>
                        <div
                            onClick={() => setIsProfileModalOpen(true)}
                            style={{
                                padding: '4px 8px', borderRadius: '12px', border: '1px solid var(--glass-border)',
                                display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'
                            }} className="glass-card-sm glass">
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <User size={18} color="white" />
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user.rol || 'USUARIO'}</span>
                            <ChevronDown size={14} color="var(--text-secondary)" />
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Profile Modal */}
            <AnimatePresence>
                {isProfileModalOpen && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                        background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center',
                        alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(10px)'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-card" style={{ width: '100%', maxWidth: '450px' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                <h3>Mi Perfil</h3>
                                <button onClick={() => setIsProfileModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>✕</button>
                            </div>

                            <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <User size={40} color="white" />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Nombre de Usuario</label>
                                    <input
                                        className="modern-input"
                                        value={profileData.nombre}
                                        onChange={(e) => setProfileData({ ...profileData, nombre: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Correo Electrónico</label>
                                    <input
                                        className="modern-input"
                                        value={profileData.email}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Rol del Sistema</label>
                                    <input
                                        className="modern-input"
                                        value={profileData.rol}
                                        disabled
                                    />
                                </div>
                                <button type="submit" className="btn-primary">
                                    <Save size={18} /> Guardar Perfil
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
