import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedUsers from './user.js';
import seedAdmin from './admin.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pfactorial';

const runSeeder = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    await seedUsers();
    await seedAdmin();
    console.log('Seeding complete.');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    mongoose.connection.close();
  }
};

runSeeder();
