import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true
  },
  amount: {
    type: Number, // For decimal or float values
    required: true
  },
  category: {
    type: String, 
    required: true
  },
  dateSpent: {
    type: String,  
    required: true
  },
  notes: {
    type: String, 
    required: false // Optional
  },
  paymentMethod: {
    type: String, 
    required: false // Optional
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
