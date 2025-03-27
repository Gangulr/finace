import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  userId: {
    type: String, // e.g., "Food", "Rent", "Entertainment", etc.
    required: true
  },
  amount: {
    type: Number, // Budget amount, supports decimal or float
    required: true
  },
  category: {
    type: String, // e.g., "Food", "Rent", "Entertainment", etc.
    required: true
  },
  startDate: {
    type: String,  // Date when the budget starts
    required: true
  },
  endDate: {
    type: String,  // Date when the budget ends
    required: true
  },
  notes: {
    type: String, // Optional additional information about the budget
    required: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
