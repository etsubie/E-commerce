import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import Permission from '../models/permissionModel.js';
import bcrypt from 'bcryptjs';

// Create a new User using role and permission names
export const createUser = async (req, res) => {
  try {
    const { username, password, roleName, permissionNames } = req.body;

    if (!username || !password || !roleName) {
      return res.status(400).json({ message: "Username, password, and role name are required" });
    }

    // Check if User with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Find the role ID based on roleName
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(400).json({ message: `Role '${roleName}' not found` });
    }

    // Find permission IDs based on permissionNames
    const permissions = await Permission.find({ name: { $in: permissionNames } });
    if (permissions.length !== permissionNames.length) {
      return res.status(400).json({ message: "Some permissions are invalid or not found" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User with role and permissions (using IDs)
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role._id,
      permissions: permissions.map(permission => permission._id)
    });

    await newUser.save();
    return res.status(201).json({ message: "User created successfully", User: newUser });
  } catch (error) {
    console.error("Error creating User:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Users with their permissions, sorted from latest to oldest
export const getUsers = async (req, res) => {
  try {
    const Users = await User.find()
      .populate('permissions')
      .populate('role')
      .sort({ createdAt: -1 }); // Sort by createdAt field in descending order
    return res.status(200).json(Users);
  } catch (error) {
    console.error("Error fetching Users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, roleName, permissionNames } = req.body;

    // Check if User exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateData = {};

    // Validate username
    if (username) {
      updateData.username = username;
    }

    // Validate password and hash if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Validate role if provided
    if (roleName) {
      const role = await Role.findOne({ name: roleName });
      if (!role) {
        return res.status(400).json({ message: `Role '${roleName}' not found` });
      }
      updateData.role = role._id;
    }

    // Validate permissions if provided
    if (permissionNames) {
      const permissions = await Permission.find({ name: { $in: permissionNames } });
      if (permissions.length !== permissionNames.length) {
        return res.status(400).json({ message: "Some permissions are invalid or not found" });
      }
      updateData.permissions = permissions.map(permission => permission._id);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).populate('permissions');

    return res.status(200).json({ message: "User updated successfully", User: updatedUser });
  } catch (error) {
    console.error("Error updating User:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting User:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
