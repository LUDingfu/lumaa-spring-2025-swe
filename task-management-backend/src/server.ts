import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Task Management API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
