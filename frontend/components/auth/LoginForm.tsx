"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import {
  validateLogin,
  type LoginValues,
  type LoginErrors,
} from "@/components/auth/validation";
import { storeSession } from "@/lib/auth/session";

export interface LoginFormCopy {
  email: {
    label: string;
    placeholder: string;
  };
  password: {
    label: string;
    placeholder: string;
  };
  submit: string;
  submitting: string;
  serverError: string;
  unavailable: string;
  invalidCredentials: string;
  errors: {
    emailRequired: string;
    emailInvalid: string;
    passwordRequired: string;
  };
}

export interface LoginFormProps {
  copy: LoginFormCopy;
  registerHref: string;
  registerLabel: string;
  registerPrompt: string;
  successHref: string;
}

type SubmitStatus =
  | "idle"
  | "loading"
  | "server-error"
  | "unavailable"
  | "invalid-credentials";

export function LoginForm({
  copy,
  registerHref,
  registerLabel,
  registerPrompt,
  successHref,
}: LoginFormProps) {
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (field: keyof LoginValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateLogin(values, copy.errors);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email.trim(), password: values.password }),
      });
      if (response.ok) {
        try {
          const data = (await response.json()) as {
            access_token: string;
            email: string;
            role: string;
          };
          storeSession({
            token: data.access_token,
            email: data.email,
            role: data.role,
          });
        } catch {
          setStatus("server-error");
          return;
        }
        window.location.assign(successHref);
      } else if (response.status === 404) {
        setStatus("unavailable");
      } else if (response.status === 401) {
        setStatus("invalid-credentials");
      } else {
        setStatus("server-error");
      }
    } catch {
      setStatus("server-error");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        type="email"
        label={copy.email.label}
        placeholder={copy.email.placeholder}
        autoComplete="email"
        required
        value={values.email}
        onChange={(event) => handleChange("email", event.target.value)}
        error={errors.email}
        disabled={status === "loading"}
      />
      <Input
        type="password"
        label={copy.password.label}
        placeholder={copy.password.placeholder}
        autoComplete="current-password"
        required
        value={values.password}
        onChange={(event) => handleChange("password", event.target.value)}
        error={errors.password}
        disabled={status === "loading"}
      />

      {status === "invalid-credentials" ? (
        <Alert variant="error">{copy.invalidCredentials}</Alert>
      ) : null}
      {status === "server-error" ? (
        <Alert variant="error">{copy.serverError}</Alert>
      ) : null}
      {status === "unavailable" ? (
        <Alert variant="warning">{copy.unavailable}</Alert>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" size="lg" loading={status === "loading"}>
          {status === "loading" ? copy.submitting : copy.submit}
        </Button>
        <div className="flex flex-wrap items-center gap-1.5">
          <Text size="sm" muted>
            {registerPrompt}
          </Text>
          <Link
            href={registerHref}
            className="rounded-md text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {registerLabel}
          </Link>
        </div>
      </div>
    </form>
  );
}
