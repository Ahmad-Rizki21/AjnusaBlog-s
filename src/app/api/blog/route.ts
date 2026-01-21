import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AdminRole, Permission, hasPermission } from '@/lib/permissions';

// GET all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');

    const posts = await prisma.blogPost.findMany({
      where: published === 'true' ? { published: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil artikel' },
      { status: 500 }
    );
  }
}

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

// POST create new blog post
export async function POST(request: NextRequest) {
  try {
    // Check permission
    const admin = await getCurrentAdmin(request);

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized - Silakan login terlebih dahulu' },
        { status: 401 }
      );
    }

    if (!hasPermission(admin.role, Permission.CREATE_BLOG)) {
      return NextResponse.json(
        { error: 'Forbidden - Role Anda tidak memiliki izin untuk membuat artikel' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, slug, excerpt, content, image, category, author, published } = body;

    if (!title || !slug || !excerpt || !content || !category || !author) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi kecuali gambar' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'Slug sudah digunakan, gunakan slug lain' },
        { status: 400 }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image: image || null,
        category,
        author,
        published: published ?? true,
        authorId: admin.id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Gagal membuat artikel' },
      { status: 500 }
    );
  }
}
