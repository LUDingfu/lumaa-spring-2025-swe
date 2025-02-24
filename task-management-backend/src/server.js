"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
// Middleware to parse JSON
app.use(express_1.default.json());
// Routes
app.use('/auth', authRoutes_1.default);
app.use('/tasks', taskRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Task Management API');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
