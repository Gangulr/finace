import Expense from '../models/expence.js';

// Create Expense
export const createExpense = async (req, res) => {
  const {  userId, amount, category, dateSpent, notes, paymentMethod } = req.body;

  try {
    const expense = new Expense({  userId, amount, category, dateSpent, notes, paymentMethod });
    await expense.save();
    res.status(201).json({ message: 'Expense created successfully', expense });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read All Expenses
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Expense
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { user, amount, category, dateSpent, notes, paymentMethod } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(id, { user, amount, category, dateSpent, notes, paymentMethod }, { new: true });
    res.status(200).json({ message: 'Expense updated successfully', updatedExpense });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getCurrentEItem = async (req, res, next) => {
    
  try {
    const { userId } = req.params;
    console.log(userId)

   
    const items = await Expense.find({ userId});
    console.log(items)

    

    
    res.json(items);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
