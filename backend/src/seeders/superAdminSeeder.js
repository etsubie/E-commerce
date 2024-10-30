import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Role from '../models/roleModel.js';
import dbConnect from '../config/dbConnection.js';
import User from '../models/userModel.js';

dotenv.config();
dbConnect();

const updateOrCreateSuperAdmin = async () => {
  try {
    // Check if the SuperAdmin role exists, or create it if it doesn't
    let superAdminRole = await Role.findOne({ name: 'SuperAdmin' });
    if (!superAdminRole) {
      superAdminRole = new Role({ name: 'SuperAdmin' });
      await superAdminRole.save();
      console.log("SuperAdmin role created");
    }

    const superAdminData = {
      username: 'superadmin',
      role: superAdminRole._id,
      password: await bcrypt.hash('1234', 10), // Hashing password
    };

    // Update the super admin if they exist, or create a new one
    const superAdmin = await User.findOneAndUpdate(
      { username: 'superadmin' },
      superAdminData,             // Update fields
      { new: true, upsert: true } // Options: create if not exists, return new doc
    );

    if (superAdmin) {
      console.log("Super admin updated successfully");
    } else {
      console.log("Super admin created successfully");
    }

  } catch (error) {
    console.error("Error in updating or creating super admin:", error);
  } finally {
    mongoose.connection.close(); 
  }
};

updateOrCreateSuperAdmin();
