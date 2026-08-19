/**
 * API client for the Book Store backend (FastAPI).
 * Base URL can be overridden with the REACT_APP_API_URL environment variable.
 */

// ---- API model types ----
export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock: number;
  is_active: boolean;
  created_at: string;
}

export interface Service {
  id: number;
  title: string;
  description: string | null;
  price: number;
  duration: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  username: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface UserCreate {
  full_name: string;
  email: string;
  username: string;
  password: string;
}

export interface ContactCreate {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface ForgotPasswordResponse {
  message: string;
  reset_token: string;
}

export interface MessageResponse {
  message: string;
}

export interface Paginated<T> {
  total: number;
  items: T[];
}

// ---- Request helper ----
const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/v1';

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
  isForm?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token, isForm = false } = options;
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload: string | undefined;
  if (body !== undefined) {
    if (isForm) {
      // OAuth2 login uses application/x-www-form-urlencoded
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      payload = new URLSearchParams(body as Record<string, string>).toString();
    } else {
      headers['Content-Type'] = 'application/json';
      payload = JSON.stringify(body);
    }
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { method, headers, body: payload });
  } catch (err) {
    throw new Error('Cannot reach the server. Is the backend running on port 8000?');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // FastAPI validation errors come as { detail: [...] }
    let message: string = data.detail;
    if (Array.isArray(message)) {
      message = message.map((e: { msg: string }) => e.msg).join(', ');
    }
    throw new Error(message || `Request failed with status ${res.status}`);
  }

  return data as T;
}

export const api = {
  // ---- Public ----
  getProducts: () => request<Paginated<Product>>('/products'),
  getProduct: (id: number) => request<Product>(`/products/${id}`),
  getServices: () => request<Paginated<Service>>('/services'),
  getService: (id: number) => request<Service>(`/services/${id}`),
  submitContact: (payload: ContactCreate) =>
    request<ContactCreate>('/contacts', { method: 'POST', body: payload }),

  // ---- Auth ----
  register: (payload: UserCreate) =>
    request<User>('/auth/register', { method: 'POST', body: payload }),
  login: (email: string, password: string) =>
    request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: { username: email, password },
      isForm: true,
    }),
  forgotPassword: (email: string) =>
    request<ForgotPasswordResponse>('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    }),
  resetPassword: (token: string, newPassword: string) =>
    request<MessageResponse>('/auth/reset-password', {
      method: 'POST',
      body: { token, new_password: newPassword },
    }),

  // ---- Authenticated user ----
  getMe: (token: string | null) => request<User>('/auth/me', { token }),
  updateProfile: (payload: { full_name?: string; password?: string }, token: string | null) =>
    request<User>('/users/me', { method: 'PUT', body: payload, token }),
};

export default api;
