import { createContext, useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';
import toast from 'react-hot-toast';

export const AuthContext = createContext<any | null>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (window.location.pathname === '/auth') return;

      const { user, token } = parseCookies();

      if (!user || !token) window.location.href = '/auth';

      setUser(JSON.parse(user));
      setToken(JSON.parse(token));
    } catch (error) {
      console.error(error);
      window.location.href = '/auth';
    }
  }, []);

  const login = (user: any, token: string) => {
    setUser(user);
    setToken(token);

    setCookie(null, 'token', JSON.stringify(token), {
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    setCookie(null, 'user', JSON.stringify(user), {
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    window.location.href = '/';
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    setCookie(null, 'token', '', {
      path: '/',
      maxAge: -1,
    });

    setCookie(null, 'user', '', {
      path: '/',
      maxAge: -1,
    });

    window.location.href = '/auth';
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
