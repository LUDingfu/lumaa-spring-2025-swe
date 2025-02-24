import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';

const App: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/tasks" element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} />
            </Routes>
        </Router>
    );
};

export default App;
