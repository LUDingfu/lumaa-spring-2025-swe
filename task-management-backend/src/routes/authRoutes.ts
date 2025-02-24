import express from 'express';
const router = express.Router();

// Basic auth routes
router.post('/register', (req, res) => {
    res.json({ message: 'Register endpoint' });
});

router.post('/login', (req, res) => {
    res.json({ message: 'Login endpoint' });
});

// Add this test route
router.get('/', (req, res) => {
    res.json({ message: 'Auth route is working' });
});

export default router;
