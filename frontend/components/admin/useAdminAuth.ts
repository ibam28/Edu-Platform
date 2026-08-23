"use client";

import { useEffect, useState } from "react";
import { clearSession, getSession } from "@/lib/auth/session";

export type AdminAuthStatus =
  | "loading"
  | "authenticated"
  | "unauthorized"
  | "error";

export function useAdminAuth(): AdminAuthStatus {
  const [status, setStatus] = useState<AdminAuthStatus>("loading");

  useEffect(() => {
    const session = getSession();
    if (!session) {
      setStatus("unauthorized");
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
          const data = (await response.json()) as { role: string };
          setStatus(data.role === "admin" ? "authenticated" : "unauthorized");
        } else if (response.status === 401) {
          clearSession();
          setStatus("unauthorized");
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

  return status;
}
