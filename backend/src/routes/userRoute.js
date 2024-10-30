import express from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import { authorizeRole } from '../middlewares/roleMiddleware.js';

const userRoute = express.Router();

// Route for super admin to create an admin with role and permissions 
userRoute.post(
  '/',
  verifyToken,
  authorizeRole('SuperAdmin'),
  createUser
);

// Route for super admin to get all admins
userRoute.get(
  '/',
  verifyToken,
  authorizeRole('SuperAdmin'),
  getUsers
);

// Route for super admin to update an admin
userRoute.patch(
  '/:id',
  verifyToken,
  authorizeRole('SuperAdmin'),
  updateUser
);

// Route for super admin to delete an admin
userRoute.delete(
  '/:id',
  verifyToken,
  authorizeRole('SuperAdmin'),
  deleteUser
);

export default userRoute;
