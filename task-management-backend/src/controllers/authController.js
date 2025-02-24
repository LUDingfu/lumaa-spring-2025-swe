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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const saltRounds = 10;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // Insert new user
        const result = yield db_1.default.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username', [username, hashedPassword]);
        console.log('Register request received');
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Error registering user.' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Check if user exists
        const userResult = yield db_1.default.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }
        const user = userResult.rows[0];
        // Compare passwords
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }
        // Create JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
        return;
    }
    catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Error logging in.' });
    }
});
exports.login = login;
