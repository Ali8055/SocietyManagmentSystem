import express from 'express';
import { addBill, getBillsByHouse, payBill, generateMonthlyBills } from '../controllers/billController.js';

const router = express.Router();

router.post('/add', addBill);                 // Add a new bill manually
router.get('/:houseId', getBillsByHouse);     // Get all bills for a house
router.put('/pay/:billId', payBill);          // Pay a specific bill
router.post('/generate-monthly-bills', generateMonthlyBills);  // Generate bills for all houses

export default router;
