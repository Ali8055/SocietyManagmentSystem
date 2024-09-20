import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'House', required: true },
  amount: { type: Number, default: 3000 },    // Fixed bill amount
  dueDate: { type: Date, required: true },    // Due date for the bill
  isPaid: { type: Boolean, default: false },  // To check if bill is paid
  paidAt: { type: Date },
  lateFine: { type: Number, default: 200 },   // Late fine is 200 if due date is expired
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema);

export default Bill;
