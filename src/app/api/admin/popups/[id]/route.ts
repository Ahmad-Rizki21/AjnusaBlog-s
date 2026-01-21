import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Permission, hasPermission } from '@/lib/permissions';

type Params = Promise<{ id: string }>;

// GET single popup by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;

    const popup = await prisma.popup.findUnique({
      where: { id },
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

    if (!popup) {
      return NextResponse.json(
        { error: 'Popup tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(popup);
  } catch (error) {
    console.error('Error fetching popup:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil popup' },
      { status: 500 }
    );
  }
}

// PUT update popup
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
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
        { error: 'Forbidden - Role Anda tidak memiliki izin untuk mengedit popup' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, type, content, link, isActive, delay, showClose, width, height } = body;

    // Check if popup exists
    const existingPopup = await prisma.popup.findUnique({
      where: { id },
    });

    if (!existingPopup) {
      return NextResponse.json(
        { error: 'Popup tidak ditemukan' },
        { status: 404 }
      );
    }

    // If this popup is being set to active, deactivate all other popups
    if (isActive && !existingPopup.isActive) {
      await prisma.popup.updateMany({
        where: {
          isActive: true,
          id: { not: id },
        },
        data: { isActive: false },
      });
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (type !== undefined) updateData.type = type;
    if (content !== undefined) updateData.content = content;
    if (link !== undefined) updateData.link = link;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (delay !== undefined) updateData.delay = delay;
    if (showClose !== undefined) updateData.showClose = showClose;
    if (width !== undefined) updateData.width = width;
    if (height !== undefined) updateData.height = height;

    const updatedPopup = await prisma.popup.update({
      where: { id },
      data: updateData,
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
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedPopup);
  } catch (error) {
    console.error('Error updating popup:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate popup' },
      { status: 500 }
    );
  }
}

// DELETE popup
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
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

    if (!admin || !hasPermission(admin.role, Permission.DELETE_BLOG)) {
      return NextResponse.json(
        { error: 'Forbidden - Role Anda tidak memiliki izin untuk menghapus popup' },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Check if popup exists
    const existingPopup = await prisma.popup.findUnique({
      where: { id },
    });

    if (!existingPopup) {
      return NextResponse.json(
        { error: 'Popup tidak ditemukan' },
        { status: 404 }
      );
    }

    await prisma.popup.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Popup berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting popup:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus popup' },
      { status: 500 }
    );
  }
}
