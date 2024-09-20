import express from "express";
import {
  addBill,
  getBillsByHouse,
  payBill,
} from "../controllers/billControll.js";
const router = express.Router();

router.post("/add", addBill); // Add a new bill
router.get("/:houseId", getBillsByHouse); // Get all bills for a house
router.put("/pay/:billId", payBill); // Pay a specific bill

export default router;
