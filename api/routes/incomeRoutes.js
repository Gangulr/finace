import express from 'express';
import { createIncome, getAllIncomes, updateIncome, deleteIncome, getCurrentItem } from '../controllers/incomeController.js';

const router = express.Router();

router.post('/create', createIncome);
router.get('/get', getAllIncomes);
router.put('/update/:id', updateIncome);
router.delete('/delete/:id', deleteIncome);
router.get("/Items/:userId",  getCurrentItem);

export default router;
