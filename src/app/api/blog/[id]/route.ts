import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Permission, hasPermission } from '@/lib/permissions';

type Params = Promise<{ id: string }>;

// Helper to get current admin from request
async function getCurrentAdmin(request: NextRequest) {
  const adminId = request.headers.get('x-admin-id');

  if (!adminId) {
    return null;
  }

  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return admin;
}

// GET single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Artikel tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil artikel' },
      { status: 500 }
    );
  }
}

// PUT update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    // Check permission
    const admin = await getCurrentAdmin(request);

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized - Silakan login terlebih dahulu' },
        { status: 401 }
      );
    }

    if (!hasPermission(admin.role, Permission.EDIT_BLOG)) {
      return NextResponse.json(
        { error: 'Forbidden - Role Anda tidak memiliki izin untuk mengedit artikel' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, slug, excerpt, content, image, category, author, published } = body;

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Artikel tidak ditemukan' },
        { status: 404 }
      );
    }

    // If slug changed, check if new slug is already taken
    if (slug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Slug sudah digunakan, gunakan slug lain' },
          { status: 400 }
        );
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        image: image || null,
        category,
        author,
        published: published ?? true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate artikel' },
      { status: 500 }
    );
  }
}

// DELETE blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    // Check permission
    const admin = await getCurrentAdmin(request);

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized - Silakan login terlebih dahulu' },
        { status: 401 }
      );
    }

    if (!hasPermission(admin.role, Permission.DELETE_BLOG)) {
      return NextResponse.json(
        { error: 'Forbidden - Role Anda tidak memiliki izin untuk menghapus artikel' },
        { status: 403 }
      );
    }

    const { id } = await params;
    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Artikel tidak ditemukan' },
        { status: 404 }
      );
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Artikel berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus artikel' },
      { status: 500 }
    );
  }
}
