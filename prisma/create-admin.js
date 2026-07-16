const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'admin@theaischool.com';
  const password = 'admin123';

  console.log(`Checking if admin user ${email} already exists...`);
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log(`Admin user ${email} already exists in database.`);
    return;
  }

  console.log('Hashing password...');
  const passwordHash = await bcrypt.hash(password, 10);

  console.log('Creating AdminUser in database...');
  const admin = await prisma.adminUser.create({
    data: {
      name: 'System Admin',
      email,
      passwordHash,
    },
  });

  console.log('Successfully created admin user:', admin.email);
}

main()
  .catch((e) => {
    console.error('Error creating admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
