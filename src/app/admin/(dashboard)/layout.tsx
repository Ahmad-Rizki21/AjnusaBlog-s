'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Menu,
  X,
  Building2,
  Users,
  Shield,
  Megaphone,
} from 'lucide-react';

import { AdminRole, Permission, hasPermission } from '@/lib/permissions';

interface AdminData {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  username: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const session = localStorage.getItem('adminSession');
    if (session) {
      setAdmin(JSON.parse(session));
    } else {
      router.push('/admin/login');
    }
  }, [router, isMounted]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    router.push('/admin/login');
  };

  // Show nothing during SSR/first render to prevent hydration mismatch
  if (!isMounted || !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, permission: Permission.VIEW_DASHBOARD },
    { href: '/admin/blog', label: 'Artikel Blog', icon: FileText, permission: Permission.VIEW_BLOG },
    { href: '/admin/users', label: 'Manajemen User', icon: Users, permission: Permission.VIEW_USERS },
    { href: '/admin/popups', label: 'Popup Iklan', icon: Megaphone, permission: Permission.EDIT_BLOG },
  ].filter(item => admin && hasPermission(admin.role, item.permission));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">AJNUSA</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="mb-4 px-4">
            <p className="text-sm text-gray-400">Logged in as:</p>
            <p className="font-medium text-white">{admin.name}</p>
            <p className="text-xs text-gray-500">{admin.email}</p>
            <div className="mt-2 flex items-center gap-2">
              <Shield size={12} className="text-red-400" />
              <span className="text-xs text-red-400 font-medium">{admin.role}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-red-700 hover:text-white transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900 mr-4"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
