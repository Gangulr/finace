import Budget from '../models/budget.js';
import Expense from '../models/expence.js';
import Income from '../models/income.js';

export const getUserFinancialSummary = async (req, res) => {
  try {
    const { userId } = req.params; // Get the userId from the request parameters

    // Calculate total budget for the user
    const totalBudget = await Budget.aggregate([
      { $match: { userId } }, // Match the userId
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } } // Sum all the budget amounts
    ]);

    // Calculate total expenses for the user
    const totalExpenses = await Expense.aggregate([
      { $match: { userId } }, // Match the userId
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } } // Sum all the expense amounts
    ]);

    // Calculate total income for the user
    const totalIncome = await Income.aggregate([
      { $match: { userId } }, // Match the userId
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } } // Sum all the income amounts
    ]);

    // Extract the sums from the aggregation result
    const budgetAmount = totalBudget[0]?.totalAmount || 0;
    const expenseAmount = totalExpenses[0]?.totalAmount || 0;
    const incomeAmount = totalIncome[0]?.totalAmount || 0;

    // Prepare the response
    const summary = {
      budget: budgetAmount,
      expenses: expenseAmount,
      income: incomeAmount,
      balance: incomeAmount - expenseAmount, // Balance = Income - Expenses
    };

    return res.status(200).json(summary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
