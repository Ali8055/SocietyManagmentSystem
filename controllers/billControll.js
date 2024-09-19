import Bill from '../models/Bill';
import House from '../models/House';

// Add a new bill for a house
export const addBill = async (req, res) => {
  const { houseId, amount, dueDate, lateFine } = req.body;

  try {
    const bill = new Bill({ house: houseId, amount, dueDate, lateFine });
    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Error adding bill' });
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

    bill.isPaid = true;
    bill.paidAt = new Date();
    await bill.save();

    res.status(200).json({ message: 'Bill paid successfully', bill });
  } catch (error) {
    res.status(500).json({ message: 'Error paying bill' });
  }
};
