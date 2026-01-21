import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all active popups for public
export async function GET(request: NextRequest) {
  try {
    const popups = await prisma.popup.findMany({
      where: {
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        type: true,
        content: true,
        link: true,
        delay: true,
        showClose: true,
        width: true,
        height: true,
        createdAt: true,
        updatedAt: true,
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(popups);
  } catch (error) {
    console.error('Error fetching popups:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil popup' },
      { status: 500 }
    );
  }
}
