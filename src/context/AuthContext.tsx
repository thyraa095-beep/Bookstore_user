import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api, { User, UserCreate } from '../api/client';

interface AuthContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (payload: UserCreate) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const TOKEN_KEY = 'bookstore_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(
    Boolean(localStorage.getItem(TOKEN_KEY))
  );

  // If we have a stored token, fetch the current user on mount.
  useEffect(() => {
    let active = true;
    if (token) {
      api
        .getMe(token)
        .then((me) => {
          if (active) setUser(me);
        })
        .catch(() => {
          // Token is invalid/expired -> clear it
          localStorage.removeItem(TOKEN_KEY);
          if (active) {
            setToken(null);
            setUser(null);
          }
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    } else {
      setLoading(false);
    }
    return () => {
      active = false;
    };
  }, [token]);

  const login = async (email: string, password: string): Promise<User> => {
    const data = await api.login(email, password);
    localStorage.setItem(TOKEN_KEY, data.access_token);
    setToken(data.access_token);
    const me = await api.getMe(data.access_token);
    setUser(me);
    return me;
  };

  const register = (payload: UserCreate): Promise<User> => api.register(payload);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
