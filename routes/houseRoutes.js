import express from 'express';

import { addHouse, getHouses, getHouseById, updateHouse, getHouseByHouseNumber } from '../controllers/houseController.js';
const router = express.Router();

router.post('/add', addHouse);           // Add a house
router.get('/', getHouses);              // Get all houses
// router.get('/:id', getHouseById);        // Get specific house by ID
router.put('/:id', updateHouse);         // Update house details
router.get('/number/:houseNumber', getHouseByHouseNumber); // Fetch house by house number

// module.exports = router;
export default router;
