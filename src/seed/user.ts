import User from '../models/User.js';
import bcrypt from 'bcrypt';

interface PredefinedUser {
  name: string;
  email: string;
  password: string;
}

const predefinedUsers: PredefinedUser[] = [
  {  "email": "user1@example.com", "name": "John Doe", "password": "password123" },
 { "email": "user2@example.com", "name": "Jane Smith" , "password": "password123" },
 {  "email": "user3@example.com", "name": "Mike Johnson" , "password": "password123" },
 {  "email": "user4@example.com", "name": "Sarah Wilson" , "password": "password123" },
 {  "email": "user5@example.com", "name": "David Brown" , "password": "password123" },
];

const seedUsers = async (): Promise<void> => {
  for (const userData of predefinedUsers) {
    const existingUser = await User.findOne({ email: userData.email });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      await User.create({ ...userData, password: hashedPassword });
      console.log(`User ${userData.email} created.`);
    } else {
      console.log(`User ${userData.email} already exists.`);
    }
  }
};

export default seedUsers;