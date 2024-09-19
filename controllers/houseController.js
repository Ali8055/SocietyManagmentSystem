import House from '../models/House';
// Add new house
export const addHouse = async (req, res) => {
  const { houseNumber, owner, isRented, tenant } = req.body;

  try {
    const newHouse = new House({ houseNumber, owner, isRented, tenant });
    const house = await newHouse.save();
    res.status(201).json(house);
  } catch (error) {
    res.status(500).json({ message: 'Error adding house' });
  }
};

// Get all houses
export const getHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching houses' });
  }
};

// Get house details by ID
export const getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ message: 'House not found' });

    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching house' });
  }
};

// Update house details
export const updateHouse = async (req, res) => {
  try {
    const updatedHouse = await House.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedHouse);
  } catch (error) {
    res.status(500).json({ message: 'Error updating house' });
  }
};
