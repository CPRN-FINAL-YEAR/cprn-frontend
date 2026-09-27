export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export async function fetchApi(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Only auto-redirect to login on 401 when NOT on an auth page
    // (prevents redirect loop on forgot/reset-password pages)
    if (response.status === 401) {
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
      }
    }
    
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { detail: 'An unexpected error occurred' };
    }
    
    const error = new Error(typeof errorData.detail === 'string' ? errorData.detail : (errorData.detail?.[0]?.msg || 'API request failed'));
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
