import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AdminRole } from '@prisma/client';
import { Permission } from '@/lib/permissions';

/**
 * Verify admin session from Authorization header
 * Returns the admin user if valid, null otherwise
 */
export async function verifyAdminSession(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  // For now, we'll use a simple approach where the token is the admin ID
  // In production, you should use JWT tokens or proper session management
  const admin = await prisma.admin.findUnique({
    where: { id: token },
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

/**
 * Check if admin has required permission
 * Returns 403 response if not authorized
 */
export function requirePermission(admin: any, permission: Permission): NextResponse | null {
  if (!admin) {
    return NextResponse.json(
      { error: 'Unauthorized - Please login' },
      { status: 401 }
    );
  }

  const hasPermission = checkRolePermission(admin.role, permission);

  if (!hasPermission) {
    return NextResponse.json(
      { error: 'Forbidden - Insufficient permissions' },
      { status: 403 }
    );
  }

  return null;
}

/**
 * Check if role has permission
 */
function checkRolePermission(role: AdminRole, permission: Permission): boolean {
  const permissions: Record<AdminRole, Permission[]> = {
    [AdminRole.ADMIN]: [
      Permission.VIEW_BLOG,
      Permission.CREATE_BLOG,
      Permission.EDIT_BLOG,
      Permission.DELETE_BLOG,
      Permission.VIEW_USERS,
      Permission.CREATE_USERS,
      Permission.EDIT_USERS,
      Permission.DELETE_USERS,
      Permission.VIEW_DASHBOARD,
    ],
    [AdminRole.EDITOR]: [
      Permission.VIEW_BLOG,
      Permission.CREATE_BLOG,
      Permission.EDIT_BLOG,
      Permission.DELETE_BLOG,
      Permission.VIEW_DASHBOARD,
    ],
    [AdminRole.READ_ONLY]: [
      Permission.VIEW_BLOG,
      Permission.VIEW_DASHBOARD,
    ],
  };

  return permissions[role]?.includes(permission) ?? false;
}

/**
 * Get admin from session ID (for client-side auth)
 */
export async function getAdminFromSession(sessionId: string) {
  return await prisma.admin.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      role: true,
    },
  });
}
