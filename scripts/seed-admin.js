const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Parse .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) return;
  const key = trimmed.slice(0, eqIdx).trim();
  let value = trimmed.slice(eqIdx + 1).trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  env[key] = value;
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'user'], default: 'user' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true, collection: 'users' });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  const email = env.ADMIN_EMAIL;
  const password = env.ADMIN_PASSWORD;
  const mongoUri = env.MONGODB_URI;

  if (!email || !password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local');
    process.exit(1);
  }

  if (!mongoUri) {
    console.error('MONGODB_URI must be set in .env.local');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(mongoUri);
  console.log('Connected.');

  const hashedPassword = await bcrypt.hash(password, 12);

  const existing = await User.findOne({ email });

  if (existing) {
    existing.password = hashedPassword;
    existing.role = 'admin';
    existing.isVerified = true;
    existing.otp = undefined;
    existing.otpExpires = undefined;
    await existing.save();
    console.log(`Updated existing user ${email} -> admin (verified, password reset)`);
  } else {
    await User.create({
      name: 'Admin',
      email,
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    });
    console.log(`Created admin user: ${email}`);
  }

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch(e => { console.error(e); process.exit(1); });
