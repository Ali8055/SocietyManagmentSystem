import express from 'express';
import {registerUser} from '../controllers/userController.js';

const router = express.Router();

// Register a user
router.post('/register', registerUser);

// module.exports = router;
export default router;

