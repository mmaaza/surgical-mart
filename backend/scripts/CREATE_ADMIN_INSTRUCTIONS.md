# Creating Admin User - Instructions

## Quick Start (Choose One Method)

### Method 1: Interactive Script (Recommended)

```bash
cd backend
node scripts/createAdminDirect.js
```

Then follow the prompts:
- Enter your email
- Enter your password (minimum 6 characters)
- Enter your name

**Example Output:**
```
🔐 Creating Admin User in MongoDB

Admin Email: admin@surgicalmartnepal.com
Admin Password (min 6 characters): admin123
Admin Name: Admin User

✅ Connected to MongoDB

✅ Admin User Created Successfully!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: Admin User
Email: admin@surgicalmartnepal.com
Role: admin
Email Verified: Yes
ID: 507f1f77bcf86cd799439011
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 Login Credentials:
   Email: admin@surgicalmartnepal.com
   Password: admin123

📝 Login at: http://localhost:5173/login
📊 Admin Panel: http://localhost:5173/admin
```

---

### Method 2: Direct Command with Arguments

```bash
cd backend
node scripts/createAdminDirect.js admin@surgicalmartnepal.com admin123 "Admin User"
```

Arguments:
1. Email
2. Password
3. Name

---

### Method 3: Using createAdmin.js (Alternative)

```bash
cd backend
node scripts/createAdmin.js
```

This uses Mongoose models instead of direct MongoDB connection.

---

## Next Steps

After creating the admin user:

1. **Start your frontend** (if not already running):
   ```bash
   npm run dev
   ```

2. **Go to login page**:
   - URL: http://localhost:5173/login

3. **Login with your credentials**:
   - Email: `admin@surgicalmartnepal.com`
   - Password: `admin123` (or whatever you set)

4. **Access Admin Panel**:
   - URL: http://localhost:5173/admin
   - You'll now have full admin access!

---

## Admin Panel Features

Once logged in as admin, you can:

✅ **Products** - Create, edit, delete products
✅ **Categories** - Manage product categories
✅ **Brands** - Add and manage brands
✅ **Orders** - View and manage customer orders
✅ **Vendors** - Manage vendor accounts
✅ **Customers** - View customer list
✅ **Blog** - Create blog posts
✅ **Media** - Manage images and files
✅ **Settings** - Configure homepage, navigation, SEO, email settings
✅ **Analytics** - View reports and statistics

---

## Troubleshooting

### "MongoDB Connection Failed"
- Make sure your backend server is running: `npm start`
- Check your `.env` file has correct `MONGODB_URI`
- Verify MongoDB is running

### "Email already exists"
- You can't create two users with same email
- Either use a different email or delete the existing user from database

### "Password must be at least 6 characters"
- Your password is too short
- Use at least 6 characters

### Can't login after creation
- Verify the email and password are correct
- Check that `isEmailVerified: true` is set in database
- Clear browser cache and try again

---

## Manual MongoDB Update (If Scripts Fail)

If the scripts don't work, you can manually update an existing user or insert a new one using MongoDB compass:

```javascript
// Update existing user to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)

// Or insert new admin user directly
db.users.insertOne({
  name: "Admin User",
  email: "admin@surgicalmartnepal.com",
  password: "$2a$10$...", // bcrypt hashed password
  role: "admin",
  isEmailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## Security Notes

⚠️ **Important:**
- Don't share admin passwords
- Use strong passwords (not just `admin123`)
- Keep admin accounts secure
- You can create multiple admin accounts if needed

---

For more help, check the backend documentation or contact support.
