#!/usr/bin/env node

/**
 * Direct MongoDB Admin Creation Script
 * 
 * Usage: node scripts/createAdminDirect.js [email] [password] [name]
 * 
 * Examples:
 *   node scripts/createAdminDirect.js admin@surgicalmartnepal.com admin123 "Admin User"
 *   node scripts/createAdminDirect.js
 *   (will prompt for input if no args provided)
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function createAdmin() {
  try {
    // Get arguments from command line or prompt
    let email = process.argv[2];
    let password = process.argv[3];
    let name = process.argv[4];

    console.log('\n🔐 Creating Admin User in MongoDB\n');

    if (!email) {
      email = await prompt('Admin Email: ');
    }
    if (!password) {
      password = await prompt('Admin Password (min 6 characters): ');
    }
    if (!name) {
      name = await prompt('Admin Name: ');
    }

    // Validate
    if (!email || !password || !name) {
      console.log('\n❌ Error: All fields required');
      rl.close();
      process.exit(1);
    }

    if (password.length < 6) {
      console.log('\n❌ Error: Password must be at least 6 characters');
      rl.close();
      process.exit(1);
    }

    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/surgical-mart';
    console.log(`Connecting to: ${mongoUri}\n`);
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB\n');

    // Check if user exists
    const db = mongoose.connection.db;
    const existingUser = await db.collection('users').findOne({ email });
    
    if (existingUser) {
      console.log('❌ Email already exists in database');
      await mongoose.connection.close();
      rl.close();
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin user document
    const adminUser = {
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      isEmailVerified: true,
      phone: null,
      address: null,
      city: null,
      state: null,
      zipCode: null,
      totalOrders: 0,
      totalSpent: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert into database
    const result = await db.collection('users').insertOne(adminUser);

    console.log('✅ Admin User Created Successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Role: admin`);
    console.log(`Email Verified: Yes`);
    console.log(`ID: ${result.insertedId}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🔐 Login Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}\n`);

    console.log('📝 Login at: http://localhost:5173/login');
    console.log('📊 Admin Panel: http://localhost:5173/admin\n');

    await mongoose.connection.close();
    rl.close();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
}

createAdmin();
