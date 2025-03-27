import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
    userId: {
        type: String, // For decimal or float values
       
      },
  amount: {
    type: Number, // For decimal or float values
    required: true
  },
  source: {
    type: String, 
    required: true
  },
  dateReceived: {
    type: String, 
    required: true
  },
  category: {
    type: String, 
    required: false // Optional
  },
  notes: {
    type: String, 
    required: false // Optional
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Income = mongoose.model('Income', incomeSchema);

export default Income;
