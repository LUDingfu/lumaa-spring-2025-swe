import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// All routes here are protected
router.use(verifyToken);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
