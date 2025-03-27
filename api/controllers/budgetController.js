import Budget from '../models/budget.js';

// Create Budget
export const createBudget = async (req, res) => {
  const {  userId, amount, category, startDate, endDate, notes } = req.body;

  try {
    const budget = new Budget({  userId, amount, category, startDate, endDate, notes });
    await budget.save();
    res.status(201).json({ message: 'Budget created successfully', budget });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read All Budgets
export const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Budget
export const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { user, amount, category, startDate, endDate, notes } = req.body;

  try {
    const updatedBudget = await Budget.findByIdAndUpdate(id, { user, amount, category, startDate, endDate, notes }, { new: true });
    res.status(200).json({ message: 'Budget updated successfully', updatedBudget });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Budget
export const deleteBudget = async (req, res) => {
  const { id } = req.params;

  try {
    await Budget.findByIdAndDelete(id);
    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



export const getCurrentBItem = async (req, res, next) => {
    
  try {
    const { userId } = req.params;
    console.log(userId)

   
    const items = await Budget.find({ userId});
    console.log(items)

    

    
    res.json(items);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
