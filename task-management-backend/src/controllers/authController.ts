import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db';

const saltRounds = 10;

export const register: RequestHandler = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Insert new user
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Error registering user.' });
    }
};

export const login: RequestHandler = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        // Check if user exists
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }
        const user = userResult.rows[0];
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }
        // Create JWT
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Error logging in.' });
    }
};
