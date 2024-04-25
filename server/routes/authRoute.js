import { Router } from 'express';
import { registration, login, getMe } from '../controllers/authController.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// Registration
router.post('/registration', registration);

// Login
router.post('/login', login);

// GetMe
router.get('/me', checkAuth, getMe);

export default router;
