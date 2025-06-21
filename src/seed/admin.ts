import Admin from '../models/Admin.js';
import { hashPassword } from '../utils/hashPassword.js';


interface AdminUser {
  name: string;
  email: string;
  password: string;
}

const adminData: AdminUser = {
  name: 'admin',
  email: 'admin@example.com',
  password: 'admin@123',
};

const seedAdmin = async (): Promise<void> => {
  const existingAdmin = await Admin.findOne({ email: adminData.email });
  if (!existingAdmin) {
  const hashedPassword = await hashPassword(adminData?.password);
    await Admin.create({ ...adminData, password: hashedPassword });
    console.log(`Admin ${adminData.email} created.`);
  } else {
    console.log(`Admin ${adminData.email} already exists.`);
  }
};

export default seedAdmin;
