
import Income from "../models/income.js";

export const getIncomeByUserAndMon = async (req, res) => {
  try {
    const { userId, } = req.params;

    // Query income for the user in the selected month
    const incomeData = await Income.find({
      userId: userId,

    });

    if (!incomeData) {
      return res.status(404).json({ message: "No income data found." });
    }

    res.status(200).json(incomeData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






import Expense from "../models/expence.js";

export const getExpenseByUserAndMonth = async (req, res) => {
  try {
    const { userId,  } = req.params;

    // Query expenses for the user in the selected month
    const expenseData = await Expense.find({
      userId: userId,
    
    });

    if (!expenseData) {
      return res.status(404).json({ message: "No expense data found." });
    }

    res.status(200).json(expenseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


import Budget from "../models/budget.js";

export const getBudgetByUserAndMonth = async (req, res) => {
  try {
    const { userId } = req.params; // userId and month from request

    // Query budget for the user in the selected month
    const budgetData = await Budget.find({
      userId: userId,
      
    });

    if (!budgetData) {
      return res.status(404).json({ message: "No budget data found." });
    }

    res.status(200).json(budgetData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





