import { AdminRole } from '@prisma/client';

// Re-export AdminRole from Prisma
export { AdminRole } from '@prisma/client';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: AdminRole;
}

// Permission types
export enum Permission {
  // Blog permissions
  VIEW_BLOG = 'VIEW_BLOG',
  CREATE_BLOG = 'CREATE_BLOG',
  EDIT_BLOG = 'EDIT_BLOG',
  DELETE_BLOG = 'DELETE_BLOG',

  // User permissions
  VIEW_USERS = 'VIEW_USERS',
  CREATE_USERS = 'CREATE_USERS',
  EDIT_USERS = 'EDIT_USERS',
  DELETE_USERS = 'DELETE_USERS',

  // Dashboard permissions
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
}

// Role to permissions mapping
const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
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

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: AdminRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: AdminRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

/**
 * Check if a role has all of the specified permissions
 */
export function hasAllPermissions(role: AdminRole, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: AdminRole): string {
  const displayNames: Record<AdminRole, string> = {
    [AdminRole.ADMIN]: 'Admin',
    [AdminRole.EDITOR]: 'Editor',
    [AdminRole.READ_ONLY]: 'Read Only',
  };
  return displayNames[role] ?? role;
}

/**
 * Get role description
 */
export function getRoleDescription(role: AdminRole): string {
  const descriptions: Record<AdminRole, string> = {
    [AdminRole.ADMIN]: 'Full access - bisa mengelola users, roles, dan semua content',
    [AdminRole.EDITOR]: 'Bisa mengelola content (blog post) tapi tidak bisa mengelola users/roles',
    [AdminRole.READ_ONLY]: 'Hanya bisa melihat dashboard dan content, tidak bisa edit/delete',
  };
  return descriptions[role] ?? '';
}

/**
 * Get current admin user from localStorage (client-side)
 */
export function getCurrentAdmin(): AdminUser | null {
  if (typeof window === 'undefined') return null;

  const session = localStorage.getItem('adminSession');
  if (!session) return null;

  try {
    return JSON.parse(session) as AdminUser;
  } catch {
    return null;
  }
}

/**
 * Check if current user has permission (client-side)
 */
export function checkCurrentUserPermission(permission: Permission): boolean {
  const admin = getCurrentAdmin();
  if (!admin) return false;
  return hasPermission(admin.role, permission);
}
