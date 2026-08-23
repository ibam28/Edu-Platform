"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocale } from "@/components/locale/LocaleProvider";
import { clearSession, getSession } from "@/lib/auth/session";

export interface AuthUser {
  email: string;
  display_name: string;
  role: string;
  created_at: string;
}

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "error";

interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  logout: () => void;
  updateProfile: (display_name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue>({
  status: "loading",
  user: null,
  logout: () => {},
  updateProfile: async () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      setStatus("unauthenticated");
      return;
    }
    let cancelled = false;
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then(async (response) => {
        if (cancelled) {
          return;
        }
        if (response.ok) {
          const data = (await response.json()) as AuthUser;
          setUser(data);
          setStatus("authenticated");
        } else if (response.status === 401) {
          clearSession();
          setStatus("unauthenticated");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = useCallback(() => {
    const session = getSession();
    if (session) {
      fetch("/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.token}` },
      }).catch(() => {
        // Best-effort server-side revocation; local session is cleared anyway.
      });
    }
    clearSession();
    setUser(null);
    setStatus("unauthenticated");
    window.location.assign(`/${locale}/login`);
  }, [locale]);

  const updateProfile = useCallback(
    async (display_name: string): Promise<boolean> => {
      const session = getSession();
      if (!session) {
        return false;
      }
      try {
        const response = await fetch("/api/auth/me", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify({ display_name }),
        });
        if (!response.ok) {
          return false;
        }
        const data = (await response.json()) as AuthUser;
        setUser(data);
        return true;
      } catch {
        return false;
      }
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ status, user, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
