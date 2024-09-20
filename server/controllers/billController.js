import Bill from '../models/Bill.js';
import House from '../models/House.js';

// Add a new bill for a house
export const addBill = async (req, res) => {
  const { houseNumber, dueDate } = req.body;
  const amount = 3000;    // Fixed bill amount
  const lateFine = 200;    // Fixed late fine

  try {
    const house = await House.findOne({ houseNumber: req.params.houseNumber });
    console.log(house,"house");
    
    const bill = new Bill({ house: house._id, amount, dueDate, lateFine });
    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Error adding bill' });
  }
};

// Generate bills automatically for all houses at the start of the month
export const generateMonthlyBills = async () => {
  try {
    const houses = await House.find();
    const currentMonth = new Date().getMonth();
    const year = new Date().getFullYear();

    const dueDate = new Date(year, currentMonth + 1, 10);  // Due date is 10th of next month

    houses.forEach(async (house) => {
      const billExists = await Bill.findOne({
        house: house._id,
        dueDate: { $gte: new Date(year, currentMonth, 1), $lt: new Date(year, currentMonth + 1, 1) }
      });

      // Generate a new bill only if it doesn't already exist for this month
      if (!billExists) {
        const newBill = new Bill({ house: house._id, amount: 3000, dueDate, lateFine: 200 });
        await newBill.save();
      }
    });
  } catch (error) {
    console.error('Error generating monthly bills:', error);
  }
};

// Get all bills for a house
export const getBillsByHouse = async (req, res) => {
  try {
    const bills = await Bill.find({ house: req.params.houseId }).populate('house');
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bills' });
  }
};

// Mark a bill as paid
export const payBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    if (bill.dueDate < new Date() && !bill.isPaid) {
      bill.lateFine = 200;  // Apply late fine if due date has passed
    }

    bill.isPaid = true;
    bill.paidAt = new Date();
    await bill.save();

    res.status(200).json({ message: 'Bill paid successfully', bill });
  } catch (error) {
    res.status(500).json({ message: 'Error paying bill' });
  }
};

