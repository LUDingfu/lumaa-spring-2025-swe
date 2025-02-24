import { Response } from 'express';
import pool from '../db';
import { AuthRequest } from '../middleware/authMiddleware';

export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const { id: userId } = req.user;
        // Retrieve tasks for the authenticated user
        const tasksResult = await pool.query('SELECT * FROM tasks WHERE "userId" = $1', [userId]);
        res.json(tasksResult.rows);
    } catch (error) {
        console.error('Get Tasks Error:', error);
        res.status(500).json({ message: 'Error retrieving tasks.' });
    }
};

export const createTask = async (req: AuthRequest, res: Response) => {
    const { title, description } = req.body;
    try {
        const { id: userId } = req.user;
        const result = await pool.query(
            'INSERT INTO tasks (title, description, "userId") VALUES ($1, $2, $3) RETURNING *',
            [title, description, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create Task Error:', error);
        res.status(500).json({ message: 'Error creating task.' });
    }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    try {
        // Optionally, you can check if the task belongs to the user
        const result = await pool.query(
            'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), "isComplete" = COALESCE($3, "isComplete") WHERE id = $4 RETURNING *',
            [title, description, isComplete, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Task not found.' });
            return;
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Update Task Error:', error);
        res.status(500).json({ message: 'Error updating task.' });
    }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
           res.status(404).json({ message: 'Task not found.' });
           return;
        }
        res.json({ message: 'Task deleted successfully.' });
    } catch (error) {
        console.error('Delete Task Error:', error);
        res.status(500).json({ message: 'Error deleting task.' });
    }
};
