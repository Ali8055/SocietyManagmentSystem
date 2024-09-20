import mongoose from 'mongoose';
const houseSchema = new mongoose.Schema({
  houseNumber: { type: String, required: true, unique: true },
  owner: {
    name: { type: String, required: true },
    contact: { type: String, required: true },
  },
  isRented: { type: Boolean, default: false },
  tenant: {
    name: { type: String },
    contact: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const House = mongoose.model('House', houseSchema);
export default House
