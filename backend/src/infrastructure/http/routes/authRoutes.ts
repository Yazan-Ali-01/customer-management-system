import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/logout', authenticateJWT, authController.logout.bind(authController));
router.post('/refresh', authController.refresh.bind(authController));
router.get('/me', authenticateJWT, authController.me.bind(authController));

export default router;