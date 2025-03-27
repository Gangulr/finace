import Income from '../models/income.js';

// Create Income
export const createIncome = async (req, res) => {
  const { userId, amount, source, dateReceived, category, notes } = req.body;

  try {
    const income = new Income({ userId, amount, source, dateReceived, category, notes });
    await income.save();
    res.status(201).json({ message: 'Income created successfully', income });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read All Incomes
export const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Income
export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { userId, amount, source, dateReceived, category, notes } = req.body;

  try {
    const updatedIncome = await Income.findByIdAndUpdate(id, { userId, amount, source, dateReceived, category, notes }, { new: true });
    res.status(200).json({ message: 'Income updated successfully', updatedIncome });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Income
export const deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    await Income.findByIdAndDelete(id);
    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



export const getCurrentItem = async (req, res, next) => {
    
  try {
    const { userId } = req.params;
    console.log(userId)

   
    const items = await Income.find({ userId});
    console.log(items)

    

    
    res.json(items);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
