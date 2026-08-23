export const AUTH_TOKEN_KEY = "bilingual-edu:auth-token";
export const AUTH_EMAIL_KEY = "bilingual-edu:auth-email";
export const AUTH_ROLE_KEY = "bilingual-edu:auth-role";

export interface AuthSession {
  token: string;
  email: string;
  role: string;
}

export function storeSession(session: AuthSession): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(AUTH_TOKEN_KEY, session.token);
    window.localStorage.setItem(AUTH_EMAIL_KEY, session.email);
    window.localStorage.setItem(AUTH_ROLE_KEY, session.role);
  } catch {
    // Storage unavailable (e.g. private mode): the user stays unauthenticated.
  }
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      return null;
    }
    return {
      token,
      email: window.localStorage.getItem(AUTH_EMAIL_KEY) ?? "",
      role: window.localStorage.getItem(AUTH_ROLE_KEY) ?? "student",
    };
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    window.localStorage.removeItem(AUTH_EMAIL_KEY);
    window.localStorage.removeItem(AUTH_ROLE_KEY);
  } catch {
    // Storage unavailable: nothing to clear.
  }
}
