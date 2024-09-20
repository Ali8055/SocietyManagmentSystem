<<<<<<< HEAD:server/controllers/houseController.js
import House from "../models/House.js";
=======
import House from '../models/House.js';
>>>>>>> b145a2fbf1b9cd2b6ef1ea0af4ae8552040cce27:controllers/houseController.js
// Add new house
export const addHouse = async (req, res) => {
  console.log("object", req.body);
  const { houseNumber, owner, isRented, tenant } = req.body;

  try {
    const newHouse = new House({ houseNumber, owner, isRented, tenant });
    const house = await newHouse.save();
    res.status(201).json(house);
  } catch (error) {
    res.status(500).json({ message: "Error adding house" });
  }
};

// Get all houses
export const getHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses" });
  }
};

// Get house details by ID
export const getHouseById = async (req, res) => {
  try {
<<<<<<< HEAD:server/controllers/houseController.js
    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ message: "House not found" });
=======
    console.log(req.params,"req.params");
    
    const house = await House.findById(101);
    // const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ message: 'House not found' });
>>>>>>> b145a2fbf1b9cd2b6ef1ea0af4ae8552040cce27:controllers/houseController.js

    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ message: "Error fetching house" });
  }
};

// Update house details
export const updateHouse = async (req, res) => {
  try {
<<<<<<< HEAD:server/controllers/houseController.js
    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
=======
    console.log(req.params,"req.params");
    
    // const house = await House.findById(req.params.id);
    const house = await House.findOne({ houseNumber: req.params.id });
console.log(house,"house");
console.log(req.body,"req.body");


    if (!house) return res.status(404).json({ message: 'House not found' });
    const updatedHouse = await House.findByIdAndUpdate(house._id, req.body, { new: true });
>>>>>>> b145a2fbf1b9cd2b6ef1ea0af4ae8552040cce27:controllers/houseController.js
    res.status(200).json(updatedHouse);
  } catch (error) {
    res.status(500).json({ message: "Error updating house" });
  }
};

// Get house details by house number
export const getHouseByHouseNumber = async (req, res) => {
    try {
      const house = await House.findOne({ houseNumber: req.params.houseNumber });
      if (!house) return res.status(404).json({ message: 'House not found' });
  
      res.status(200).json(house);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching house' });
    }
  };
  