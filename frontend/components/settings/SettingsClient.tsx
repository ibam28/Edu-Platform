"use client";

import { useState } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/components/ui/cn";
import type { SettingsCopy } from "@/lib/i18n/dictionaries";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-colors duration-fast hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export interface SettingsClientProps {
  copy: SettingsCopy;
  locale: string;
}

type TabKey = "profile" | "security" | "preferences";

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "id-ID");
  } catch {
    return iso;
  }
}

export function SettingsClient({ copy, locale }: SettingsClientProps) {
  const { status, user, updateProfile } = useAuth();
  const [tab, setTab] = useState<TabKey>("profile");
  const [displayName, setDisplayName] = useState("");
  const [displayNameError, setDisplayNameError] = useState<string | undefined>(
    undefined,
  );
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const base = `/${locale}`;

  if (status === "loading") {
    return (
      <Container className="flex min-h-[40vh] items-center justify-center py-16">
        <div className="flex items-center gap-3" role="status">
          <Spinner className="h-5 w-5 text-primary-600" />
          <Text muted>{copy.prototypeNotice.title}</Text>
        </div>
      </Container>
    );
  }

  if (status !== "authenticated" || !user) {
    return (
      <Container className="flex min-h-[40vh] flex-col items-start justify-center gap-4 py-16">
        <Heading level={1}>{copy.hero.title}</Heading>
        <Text muted>{copy.profile.notAvailable}</Text>
        <Link href={`${base}/login`} className={primaryLinkClasses}>
          {copy.tabs.profile}
        </Link>
      </Container>
    );
  }

  const tabs: { key: TabKey; label: string }[] = [
    { key: "profile", label: copy.tabs.profile },
    { key: "security", label: copy.tabs.security },
    { key: "preferences", label: copy.tabs.preferences },
  ];

  const handleSaveProfile = async () => {
    const name = displayName.trim();
    if (!name) {
      setDisplayNameError(copy.profile.displayNameRequired);
      return;
    }
    if (name.length < 2) {
      setDisplayNameError(copy.profile.displayNameMinLength);
      return;
    }
    if (name.length > 50) {
      setDisplayNameError(copy.profile.displayNameMaxLength);
      return;
    }
    setDisplayNameError(undefined);
    setSaveStatus("saving");
    const ok = await updateProfile(name);
    setSaveStatus(ok ? "saved" : "error");
  };

  return (
    <div className="flex flex-col">
      <section aria-labelledby="settings-heading">
        <Container className="flex max-w-4xl flex-col gap-6 py-12 sm:py-16">
          <div className="flex flex-col gap-3">
            <Badge variant="accent">{copy.hero.eyebrow}</Badge>
            <Heading level={1} id="settings-heading">
              {copy.hero.title}
            </Heading>
            <Text muted>{copy.hero.description}</Text>
          </div>

          {/* Tabs */}
          <div role="tablist" aria-label={copy.hero.title} className="flex flex-wrap gap-2">
            {tabs.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={tab === item.key}
                onClick={() => setTab(item.key)}
                className={cn(
                  "inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2",
                  tab === item.key
                    ? "bg-primary-600 text-white"
                    : "border border-strong bg-transparent text-foreground hover:bg-background-subtle",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* PROFILE */}
          {tab === "profile" ? (
            <Card className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Heading level={2}>{copy.profile.title}</Heading>
                <Text size="sm" muted>
                  {copy.profile.description}
                </Text>
              </div>
              <div className="grid gap-4 sm:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <Input
                    label={copy.profile.displayName.label}
                    value={displayName}
                    onChange={(event) => {
                      setDisplayName(event.target.value);
                      setDisplayNameError(undefined);
                    }}
                    error={displayNameError}
                    disabled={saveStatus === "saving"}
                  />
                  <Text size="xs" subtle>
                    {copy.profile.displayName.note}
                  </Text>
                </div>
                <div className="flex flex-col gap-2">
                  <Input label={copy.profile.email.label} value={user?.email ?? ""} disabled />
                  <Text size="xs" subtle>
                    {copy.profile.email.note}
                  </Text>
                </div>
              </div>
              {saveStatus === "saved" ? (
                <Alert variant="success" title={copy.profile.saveSuccess}>
                  {copy.profile.saveSuccess}
                </Alert>
              ) : null}
              {saveStatus === "error" ? (
                <Alert variant="error" title={copy.profile.saveError}>
                  {copy.profile.saveError}
                </Alert>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  loading={saveStatus === "saving"}
                  onClick={handleSaveProfile}
                >
                  {saveStatus === "saving" ? copy.profile.saving : copy.profile.saveLabel}
                </Button>
              </div>
            </Card>
          ) : null}

          {/* SECURITY */}
          {tab === "security" ? (
            <Card className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Heading level={2}>{copy.security.title}</Heading>
                <Text size="sm" muted>
                  {copy.security.description}
                </Text>
              </div>
              <dl className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-sm text-muted">{copy.security.role}</dt>
                  <dd className="text-sm font-semibold text-foreground">{user.role}</dd>
                </div>
                {user.created_at ? (
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-sm text-muted">{copy.security.memberSince}</dt>
                    <dd className="text-sm font-semibold text-foreground">
                      {formatDate(user.created_at, locale)}
                    </dd>
                  </div>
                ) : null}
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-sm text-muted">{copy.security.sessionStatus}</dt>
                  <dd>
                    <Badge variant="success">{copy.security.sessionActive}</Badge>
                  </dd>
                </div>
              </dl>

              <div className="flex flex-col gap-3 border-t border-border pt-4">
                <Heading level={3}>{copy.password.title}</Heading>
                <Text size="sm" muted>
                  {copy.password.description}
                </Text>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input type="password" label={copy.password.currentLabel} disabled />
                  <Input type="password" label={copy.password.newLabel} disabled />
                  <Input type="password" label={copy.password.confirmLabel} disabled />
                </div>
                <Alert variant="warning" title={copy.profile.notAvailable}>
                  {copy.password.notAvailable}
                </Alert>
              </div>
            </Card>
          ) : null}

          {/* PREFERENCES */}
          {tab === "preferences" ? (
            <Card className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Heading level={2}>{copy.preferences.title}</Heading>
                <Text size="sm" muted>
                  {copy.preferences.description}
                </Text>
              </div>
              <div className="flex flex-col gap-2">
                <Text size="sm" className="font-medium text-foreground">
                  {copy.preferences.language}
                </Text>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/id/settings`} className={primaryLinkClasses}>
                    {copy.preferences.idLabel}
                  </Link>
                  <Link href={`/en/settings`} className={primaryLinkClasses}>
                    {copy.preferences.enLabel}
                  </Link>
                </div>
              </div>
            </Card>
          ) : null}
        </Container>
      </section>
    </div>
  );
}
