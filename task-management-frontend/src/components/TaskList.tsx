import React, { useEffect, useState } from 'react';
import API from '../services/api';

interface Task {
    id: number;
    title: string;
    description?: string;
    isComplete: boolean;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await API.get('/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await API.post('/tasks', { title: newTaskTitle, description: newTaskDescription });
            setTasks([...tasks, response.data]);
            setNewTaskTitle('');
            setNewTaskDescription('');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleToggleComplete = async (task: Task) => {
        try {
            const response = await API.put(`/tasks/${task.id}`, { isComplete: !task.isComplete });
            setTasks(tasks.map(t => t.id === task.id ? response.data : t));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await API.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <h2>Your Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
                            {task.title}
                        </span>
                        <button onClick={() => handleToggleComplete(task)}>
                            {task.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCreateTask}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TaskList;
