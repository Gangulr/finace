import express from 'express';
import { createExpense, getAllExpenses, updateExpense, deleteExpense, getCurrentEItem } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/create', createExpense);
router.get('/eget', getAllExpenses);
router.put('/update/:id', updateExpense);
router.delete('/delete/:id', deleteExpense);
router.get("/Eitem/:userId",  getCurrentEItem);

export default router;
