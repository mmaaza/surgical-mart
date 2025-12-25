#!/usr/bin/env node

/**
 * Create Admin User Script
 * 
 * Usage: node scripts/createAdmin.js
 * 
 * This script creates an admin user in the database.
 * You'll be prompted for: name, email, and password
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const readline = require('readline');

// Import User model
const User = require('../src/models/user.model');

// Create readline interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt user
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main function
async function createAdmin() {
  try {
    // Connect to MongoDB
    console.log('\n📝 Creating Admin User...\n');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/surgical-mart', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');

    // Get input from user
    const name = await prompt('Admin Name: ');
    const email = await prompt('Admin Email: ');
    const password = await prompt('Admin Password (min 6 characters): ');

    // Validate inputs
    if (!name || !email || !password) {
      console.log('\n❌ Error: All fields are required');
      rl.close();
      process.exit(1);
    }

    if (password.length < 6) {
      console.log('\n❌ Error: Password must be at least 6 characters');
      rl.close();
      process.exit(1);
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('\n❌ Error: Email already exists in database');
      rl.close();
      process.exit(1);
    }

    // Create admin user
    const user = await User.create({
      name,
      email,
      password,
      role: 'admin',
      isEmailVerified: true // Auto-verify admin emails
    });

    console.log('\n✅ Admin User Created Successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
    console.log(`Email Verified: ${user.isEmailVerified}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('🔐 You can now login with these credentials at:');
    console.log('   http://localhost:5173/login\n');
    console.log('📊 Admin Dashboard: http://localhost:5173/admin\n');

    rl.close();
    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
}

// Run the script
createAdmin();
