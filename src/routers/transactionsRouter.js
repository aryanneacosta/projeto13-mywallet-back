import express from 'express';
import { transaction, wallet } from "../controllers/userController.js";

const router = express.Router();

router.get('/transactions', wallet);
router.post('/transactions', transaction);

export default router;