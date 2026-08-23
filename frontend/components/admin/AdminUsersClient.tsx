"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Text";
import { clearSession, getSession } from "@/lib/auth/session";
import type { AdminUsersCopy } from "@/lib/i18n/dictionaries";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-colors duration-fast hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export interface AdminUsersClientProps {
  copy: AdminUsersCopy;
  locale: string;
}

interface UserRow {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

type AuthState =
  | { status: "loading" }
  | { status: "unauthorized" }
  | { status: "error" }
  | { status: "authenticated" };

const roleBadgeVariant: Record<string, BadgeVariant> = {
  admin: "accent",
  student: "primary",
  guest: "neutral",
};

export function AdminUsersClient({ copy, locale }: AdminUsersClientProps) {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });
  const [users, setUsers] = useState<UserRow[] | null>(null);
  const [query, setQuery] = useState("");

  const base = `/${locale}`;
  const loginHref = `${base}/login`;

  useEffect(() => {
    const session = getSession();
    if (!session) {
      setAuth({ status: "unauthorized" });
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
          if (data.role !== "admin") {
            setAuth({ status: "unauthorized" });
            return;
          }
          setAuth({ status: "authenticated" });
        } else if (response.status === 401) {
          clearSession();
          setAuth({ status: "unauthorized" });
        } else {
          setAuth({ status: "error" });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAuth({ status: "error" });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (auth.status !== "authenticated") {
      return;
    }
    const session = getSession();
    if (!session) {
      return;
    }
    let cancelled = false;
    setUsers(null);
    const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    fetch(`/api/admin/users${params}`, {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then(async (response) => {
        if (cancelled) {
          return;
        }
        if (response.ok) {
          const data = (await response.json()) as { users: UserRow[] };
          setUsers(data.users);
        } else {
          setUsers([]);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUsers([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [auth.status, query]);

  const filteredUsers = useMemo(() => {
    if (!users) {
      return null;
    }
    const term = query.trim().toLowerCase();
    if (!term) {
      return users;
    }
    return users.filter((user) => user.email.toLowerCase().includes(term));
  }, [users, query]);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "id-ID");
    } catch {
      return iso;
    }
  };

  return (
    <div className="flex flex-col">
      <section aria-labelledby="admin-users-hero-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Badge variant="accent">{copy.hero.eyebrow}</Badge>
          <Heading level={1} id="admin-users-hero-heading">
            {copy.hero.title}
          </Heading>
          <Text size="lg" muted>
            {copy.hero.description}
          </Text>
          {auth.status === "unauthorized" ? (
            <>
              <Alert variant="warning" title={copy.unauthorizedTitle}>
                {copy.unauthorizedDescription}
              </Alert>
              <Link href={loginHref} className={primaryLinkClasses}>
                {copy.loginLabel}
              </Link>
            </>
          ) : null}
          {auth.status === "error" ? (
            <Alert variant="error" title={copy.errorTitle}>
              {copy.errorDescription}
            </Alert>
          ) : null}
        </Container>
      </section>

      <section
        aria-labelledby="admin-users-list-heading"
        className="bg-background-muted"
      >
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex flex-col gap-3">
            <Heading level={2} id="admin-users-list-heading">
              {copy.hero.title}
            </Heading>
            {auth.status === "authenticated" ? (
              <div className="max-w-md">
                <Input
                  type="search"
                  label={copy.searchAriaLabel}
                  placeholder={copy.searchPlaceholder}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            ) : null}
          </div>

          {auth.status === "loading" ? (
            <div className="flex items-center gap-3" role="status">
              <Spinner className="h-5 w-5 text-primary-600" />
              <Text muted>{copy.loading}</Text>
            </div>
          ) : null}

          {auth.status === "authenticated" && filteredUsers === null ? (
            <div className="flex items-center gap-3" role="status">
              <Spinner className="h-5 w-5 text-primary-600" />
              <Text muted>{copy.loading}</Text>
            </div>
          ) : null}

          {auth.status === "authenticated" && filteredUsers !== null ? (
            filteredUsers.length === 0 ? (
              <EmptyState title={copy.emptyTitle} description={copy.emptyDescription} />
            ) : (
              <Card className="overflow-x-auto" padded={false}>
                <table className="w-full min-w-[40rem] text-left text-sm">
                  <thead>
                    <tr className="border-b border-strong text-xs uppercase tracking-wide text-muted">
                      <th scope="col" className="px-4 py-3 font-medium">
                        {copy.table.email}
                      </th>
                      <th scope="col" className="px-4 py-3 font-medium">
                        {copy.table.role}
                      </th>
                      <th scope="col" className="px-4 py-3 font-medium">
                        {copy.table.status}
                      </th>
                      <th scope="col" className="px-4 py-3 font-medium">
                        {copy.table.joined}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-border last:border-b-0"
                      >
                        <td className="px-4 py-3 text-foreground">{user.email}</td>
                        <td className="px-4 py-3">
                          <Badge variant={roleBadgeVariant[user.role] ?? "neutral"}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={user.is_active ? "success" : "neutral"}
                          >
                            {user.is_active
                              ? copy.statusLabels.active
                              : copy.statusLabels.inactive}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-muted">
                          {formatDate(user.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            )
          ) : null}
        </Container>
      </section>
    </div>
  );
}
