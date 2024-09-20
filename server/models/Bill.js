import mongoose from 'mongoose';
const billSchema = new mongoose.Schema({
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'House', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  lateFine: { type: Number, default: 0 },
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema);

export default Bill