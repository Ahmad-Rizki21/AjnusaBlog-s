/**
 * Fetch wrapper that automatically includes admin ID from localStorage
 * Use this for authenticated API calls in the admin panel
 */

export interface AdminSession {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
}

function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;

  const session = localStorage.getItem('adminSession');
  if (!session) return null;

  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const session = getAdminSession();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // Add admin ID header if session exists
  if (session?.id) {
    headers['x-admin-id'] = session.id;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Convenience methods
 */
export const api = {
  get: (url: string) => apiFetch(url, { method: 'GET' }),
  post: (url: string, body: unknown) =>
    apiFetch(url, { method: 'POST', body: JSON.stringify(body) }),
  put: (url: string, body: unknown) =>
    apiFetch(url, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (url: string) => apiFetch(url, { method: 'DELETE' }),
};
