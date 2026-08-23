"use client";

import { useState, type FormEvent } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ContactCopy } from "@/lib/i18n/dictionaries";

export interface ContactFormProps {
  copy: ContactCopy["form"];
}

interface ContactErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(
  values: { name: string; email: string; message: string },
  errors: ContactCopy["form"]["errors"],
): ContactErrors {
  const result: ContactErrors = {};
  if (!values.name.trim()) {
    result.name = errors.nameRequired;
  }
  if (!values.email.trim()) {
    result.email = errors.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    result.email = errors.emailInvalid;
  }
  if (!values.message.trim()) {
    result.message = errors.messageRequired;
  } else if (values.message.trim().length < 10) {
    result.message = errors.messageMinLength;
  }
  return result;
}

export function ContactForm({ copy }: ContactFormProps) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleChange = (field: string, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field as keyof ContactErrors]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values, copy.errors);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col gap-4">
        <Alert variant="success" title={copy.successTitle}>
          {copy.successDescription}
        </Alert>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => {
              setValues({ name: "", email: "", message: "" });
              setStatus("idle");
            }}
          >
            {copy.sendAnother}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label={copy.name.label}
        placeholder={copy.name.placeholder}
        required
        value={values.name}
        onChange={(event) => handleChange("name", event.target.value)}
        error={errors.name}
        disabled={status === "loading"}
      />
      <Input
        type="email"
        label={copy.email.label}
        placeholder={copy.email.placeholder}
        required
        value={values.email}
        onChange={(event) => handleChange("email", event.target.value)}
        error={errors.email}
        disabled={status === "loading"}
      />
      <Textarea
        label={copy.message.label}
        placeholder={copy.message.placeholder}
        required
        value={values.message}
        onChange={(event) => handleChange("message", event.target.value)}
        error={errors.message}
        disabled={status === "loading"}
      />
      <div className="flex flex-wrap gap-3 pt-1">
        <Button type="submit" size="lg" loading={status === "loading"}>
          {status === "loading" ? copy.submitting : copy.submit}
        </Button>
      </div>
    </form>
  );
}