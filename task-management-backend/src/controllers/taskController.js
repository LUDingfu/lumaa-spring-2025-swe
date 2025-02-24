"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const db_1 = __importDefault(require("../db"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId } = req.user;
        // Retrieve tasks for the authenticated user
        const tasksResult = yield db_1.default.query('SELECT * FROM tasks WHERE "userId" = $1', [userId]);
        res.json(tasksResult.rows);
    }
    catch (error) {
        console.error('Get Tasks Error:', error);
        res.status(500).json({ message: 'Error retrieving tasks.' });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        const { id: userId } = req.user;
        const result = yield db_1.default.query('INSERT INTO tasks (title, description, "userId") VALUES ($1, $2, $3) RETURNING *', [title, description, userId]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Create Task Error:', error);
        res.status(500).json({ message: 'Error creating task.' });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    try {
        // Optionally, you can check if the task belongs to the user
        const result = yield db_1.default.query('UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), "isComplete" = COALESCE($3, "isComplete") WHERE id = $4 RETURNING *', [title, description, isComplete, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Update Task Error:', error);
        res.status(500).json({ message: 'Error updating task.' });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.json({ message: 'Task deleted successfully.' });
    }
    catch (error) {
        console.error('Delete Task Error:', error);
        res.status(500).json({ message: 'Error deleting task.' });
    }
});
exports.deleteTask = deleteTask;
