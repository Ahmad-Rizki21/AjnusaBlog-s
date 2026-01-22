import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// GET all admin users
export async function GET(_request: NextRequest) {
  try {
    const users = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data user' },
      { status: 500 }
    );
  }
}

// POST create new admin user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, name, email, role } = body;

    if (!username || !password || !name || !email) {
      return NextResponse.json(
        { error: 'Username, password, nama, dan email wajib diisi' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUsername = await prisma.admin.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username sudah digunakan' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email sudah digunakan' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        name,
        email,
        role: role || 'READ_ONLY',
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Gagal membuat user baru' },
      { status: 500 }
    );
  }
}
