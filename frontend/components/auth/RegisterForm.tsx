"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import {
  validateRegistration,
  type RegistrationValues,
  type RegistrationErrors,
} from "@/components/auth/validation";

export interface RegisterFormCopy {
  email: {
    label: string;
    placeholder: string;
  };
  password: {
    label: string;
    placeholder: string;
    hint: string;
  };
  confirmPassword: {
    label: string;
    placeholder: string;
  };
  submit: string;
  submitting: string;
  serverError: string;
  unavailable: string;
  successTitle: string;
  successDescription: string;
  errors: {
    emailRequired: string;
    emailInvalid: string;
    passwordRequired: string;
    passwordMinLength: string;
    confirmPasswordRequired: string;
    passwordsMustMatch: string;
  };
}

export interface RegisterFormProps {
  copy: RegisterFormCopy;
  loginHref: string;
  loginLabel: string;
  loginPrompt: string;
}

type SubmitStatus =
  | "idle"
  | "loading"
  | "success"
  | "server-error"
  | "unavailable";

export function RegisterForm({
  copy,
  loginHref,
  loginLabel,
  loginPrompt,
}: RegisterFormProps) {
  const [values, setValues] = useState<RegistrationValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (field: keyof RegistrationValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateRegistration(values, copy.errors);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email.trim(), password: values.password }),
      });
      if (response.ok) {
        setStatus("success");
      } else if (response.status === 404) {
        setStatus("unavailable");
      } else {
        setStatus("server-error");
      }
    } catch {
      setStatus("server-error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col gap-4">
        <Alert variant="success" title={copy.successTitle}>
          {copy.successDescription}
        </Alert>
        <div className="flex flex-wrap items-center gap-2">
          <Text size="sm" muted>
            {loginPrompt}
          </Text>
          <Link
            href={loginHref}
            className="rounded-md text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {loginLabel}
          </Link>
        </div>
      </div>
    );
  }

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
        autoComplete="new-password"
        hint={copy.password.hint}
        required
        value={values.password}
        onChange={(event) => handleChange("password", event.target.value)}
        error={errors.password}
        disabled={status === "loading"}
      />
      <Input
        type="password"
        label={copy.confirmPassword.label}
        placeholder={copy.confirmPassword.placeholder}
        autoComplete="new-password"
        required
        value={values.confirmPassword}
        onChange={(event) => handleChange("confirmPassword", event.target.value)}
        error={errors.confirmPassword}
        disabled={status === "loading"}
      />

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
            {loginPrompt}
          </Text>
          <Link
            href={loginHref}
            className="rounded-md text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {loginLabel}
          </Link>
        </div>
      </div>
    </form>
  );
}
