"use client";

import { useEffect, type ReactNode } from "react";
import { Alert } from "@/components/ui/Alert";
import { Container } from "@/components/ui/Container";
import { Spinner } from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/components/auth/AuthProvider";
import type { AuthGuardCopy } from "@/lib/i18n/dictionaries";

export interface AuthRedirectProps {
  redirectHref: string;
  copy: AuthGuardCopy;
  children: ReactNode;
}

/**
 * Guards public auth pages (login/register):
 * - checking-session: loading state (no form flash)
 * - authenticated:    redirect to the localized dashboard (history entry
 *                     replaced, so back navigation never re-shows the form
 *                     while the session is valid)
 * - unauthenticated:  normal form
 * - invalid session:  401 clears the stored session, then the form is shown
 * - network error:    the stored session is preserved and an informative
 *                     warning is shown above the form
 */
export function AuthRedirect({
  redirectHref,
  copy,
  children,
}: AuthRedirectProps) {
  const { status } = useAuth();

  useEffect(() => {
    if (status === "authenticated") {
      window.location.replace(redirectHref);
    }
  }, [status, redirectHref]);

  if (status === "loading") {
    return (
      <Container className="flex min-h-[40vh] items-center justify-center py-16">
        <div className="flex items-center gap-3" role="status">
          <Spinner className="h-5 w-5 text-primary-600" />
          <Text muted>{copy.checking}</Text>
        </div>
      </Container>
    );
  }

  if (status === "error") {
    // Session is intentionally preserved: a network failure does not log the
    // user out. Show an informative warning above the form.
    return (
      <>
        <Container className="pt-8 sm:pt-12">
          <Alert variant="warning" title={copy.networkErrorTitle}>
            {copy.networkErrorDescription}
          </Alert>
        </Container>
        {children}
      </>
    );
  }

  return <>{children}</>;
}
