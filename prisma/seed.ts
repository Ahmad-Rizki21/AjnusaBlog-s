import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash password for admin
  const hashedPassword = await bcrypt.hash('password', 10);

  // Create default admin user
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Administrator',
      email: 'ahmad@ajnusa.com',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:');
  console.log('   Username:', admin.username);
  console.log('   Password: password');
  console.log('   Email:', admin.email);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
