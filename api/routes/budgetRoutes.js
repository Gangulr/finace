import express from 'express';
import { createBudget, getAllBudgets, updateBudget, deleteBudget, getCurrentBItem } from '../controllers/budgetController.js';

const router = express.Router();

router.post('/create', createBudget);
router.get('/bget', getAllBudgets);
router.put('/update/:id', updateBudget);
router.delete('/delete/:id', deleteBudget);
router.get("/Bitem/:userId",  getCurrentBItem);

export default router;
