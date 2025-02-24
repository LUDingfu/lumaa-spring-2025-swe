import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../services/api';

interface AuthFormProps {
    type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = type === 'register' ? '/auth/register' : '/auth/login';
            const response = await API.post(url, { username, password });

            if (type === 'login') {
                localStorage.setItem('token', response.data.token);
                history.push('/tasks');
            } else {
                history.push('/login');
            }
        } catch (error) {
            console.error(`${type === 'register' ? 'Register' : 'Login'} failed:`, error);
        }
    };

    return (
        <div>
            <h2>{type === 'register' ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
            </form>
        </div>
    );
};

export default AuthForm;
