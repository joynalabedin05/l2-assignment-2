import express from 'express';
import { UserController } from './user.controler';

const router = express.Router();
router.post('/create-user', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId',UserController.updateSingleUser);
router.delete('/:userId', UserController.deleteUser);


export const UserRoutes = router;



// const express = require('express');
// const router = express.Router();
// const User = require('./userModel'); // Import the User model

// // Route handler for the PUT /api/users/:userId/orders endpoint
// router.put('/api/users/:userId/orders', async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Check if the user exists
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: `User with ID ${userId} not found.`,
//         data: null,
//       });
//     }

//     // Extract order data from the request body
//     const { productName, price, quantity } = req.body;

//     // Create a new order object
//     const newOrder = {
//       productName,
//       price,
//       quantity,
//     };

//     // Check if the 'orders' property already exists for the user
//     if (user.orders) {
//       // Append the new order to the existing 'orders' array
//       user.orders.push(newOrder);
//     } else {
//       // Create an 'orders' array within the user object and add the order data
//       user.orders = [newOrder];
//     }

//     // Save the updated user document
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Order created successfully!',
//       data: null,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       data: null,
//     });
//   }
// });

// module.exports = router;

