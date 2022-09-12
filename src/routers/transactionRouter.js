import express from 'express';
import { transaction, wallet } from "../controllers/userController.js";
import verifyToken from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/transactions', verifyToken, wallet);
router.post('/transactions', verifyToken, transaction);

export default router;