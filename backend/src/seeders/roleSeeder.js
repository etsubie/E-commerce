import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dbConnect from '../config/dbConnection.js';
import Role from '../models/roleModel.js';

dotenv.config();

// Define and Seed Roles
const seedRoles = async () => {
  await dbConnect();

  try {
    const roles = [
      { name: 'SuperAdmin' },
      { name: 'Admin' },
      { name: 'Merchant' },
      { name: 'Customer' },
      { name: 'DeliveryBoy' },
    ];

    // Insert roles
    const roleDocs = await Role.insertMany(roles);
    console.log('Roles seeded:', roleDocs);
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {
    mongoose.connection.close(); 
  }
};

seedRoles();
