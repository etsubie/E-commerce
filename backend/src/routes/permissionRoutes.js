import express from 'express';
import { 
  createPermission, 
  getPermissions, 
  updatePermission, 
  deletePermission 
} from '../controllers/permissionController.js';
import { authorizeRole } from '../middlewares/roleMiddleware.js';
import verifyToken from '../middlewares/authMiddleware.js';

const permissionRoute = express.Router();

// Route to create a new permission
permissionRoute.post(
  '/',
  verifyToken,
  authorizeRole('SuperAdmin'),
  createPermission
);

// Route to get all permissions
permissionRoute.get(
  '/',
  verifyToken,
  authorizeRole('SuperAdmin'),
  getPermissions
);

// Route to update a permission
permissionRoute.patch(
  '/:id',
  verifyToken,
  authorizeRole('SuperAdmin'),
  updatePermission
);

// Route to delete a permission
permissionRoute.delete(
  '/:id',
  verifyToken,
  authorizeRole('SuperAdmin'),
  deletePermission
);

export default permissionRoute;
