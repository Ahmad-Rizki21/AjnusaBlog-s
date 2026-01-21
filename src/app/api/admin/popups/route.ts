import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Permission, hasPermission } from '@/lib/permissions';

// GET all popups
export async function GET(request: NextRequest) {
  try {
    const adminId = request.headers.get('x-admin-id');

    // Get current admin
    const admin = adminId ? await prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, role: true },
    }) : null;

    const popups = await prisma.popup.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        type: true,
        content: true,
        link: true,
        isActive: true,
        delay: true,
        showClose: true,
        width: true,
        height: true,
        createdBy: true,
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

    // Only return active popup for non-admin users
    if (!admin || !hasPermission(admin.role, Permission.VIEW_USERS)) {
      return NextResponse.json({
        popup: popups.find(p => p.isActive) || null,
      });
    }

    return NextResponse.json(popups);
  } catch (error) {
    console.error('Error fetching popups:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil popup' },
      { status: 500 }
    );
  }
}

// POST create new popup
export async function POST(request: NextRequest) {
  try {
    const adminId = request.headers.get('x-admin-id');

    if (!adminId) {
      return NextResponse.json(
        { error: 'Unauthorized - Silakan login terlebih dahulu' },
        { status: 401 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, role: true },
    });

    if (!admin || !hasPermission(admin.role, Permission.EDIT_BLOG)) {
      return NextResponse.json(
        { error: 'Forbidden - Role Anda tidak memiliki izin untuk membuat popup' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, type, content, link, isActive, delay, showClose, width, height } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title dan content wajib diisi' },
        { status: 400 }
      );
    }

    // If this popup is set to active, deactivate all other popups
    if (isActive) {
      await prisma.popup.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    }

    const popup = await prisma.popup.create({
      data: {
        title,
        type: type || 'IMAGE',
        content,
        link: link || null,
        isActive: isActive ?? false,
        delay: delay ?? 0,
        showClose: showClose ?? true,
        width: width ?? null,
        height: height ?? null,
        createdBy: admin.id,
      },
      select: {
        id: true,
        title: true,
        type: true,
        content: true,
        link: true,
        isActive: true,
        delay: true,
        showClose: true,
        width: true,
        height: true,
        createdAt: true,
      },
    });

    return NextResponse.json(popup, { status: 201 });
  } catch (error) {
    console.error('Error creating popup:', error);
    return NextResponse.json(
      { error: 'Gagal membuat popup' },
      { status: 500 }
    );
  }
}
