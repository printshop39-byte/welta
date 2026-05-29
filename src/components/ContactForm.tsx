"use client";

import { useState } from "react";

/**
 * Contact form — client island. Posts the message via WhatsApp instead
 * of an email backend (Phase 1.5 has no transactional email provider
 * wired). On submit we validate, build a pre-filled wa.me URL, and
 * open it in a new tab. The form itself stays on /contact so the user
 * can correct typos and resend.
 *
 * Hydration safety: every input is a controlled React state value
 * initialised to "". The server renders empty inputs, the first client
 * paint renders empty inputs — identical DOM, no mismatch. State only
 * diverges from "" as the user types.
 */

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918468900336";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState | "_contact", string>>;

const INITIAL: FormState = { name: "", email: "", phone: "", message: "" };

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }
  // At least one of email or phone is required so the atelier can reply
  // if WhatsApp isn't an option. Both can be filled in — better data.
  const hasEmail = form.email.trim().length > 0;
  const hasPhone = form.phone.trim().length > 0;
  if (!hasEmail && !hasPhone) {
    errors._contact = "Please share your email or phone.";
  } else {
    if (hasEmail && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (hasPhone && form.phone.replace(/\D/g, "").length < 7) {
      errors.phone = "Please enter a valid phone number.";
    }
  }
  if (!form.message.trim()) {
    errors.message = "Please write a short message.";
  }
  return errors;
}

function buildWhatsappUrl(form: FormState): string {
  const lines = [
    "Hi Welta atelier — new enquiry from your website:",
    "",
    `Name: ${form.name.trim()}`,
  ];
  if (form.email.trim()) lines.push(`Email: ${form.email.trim()}`);
  if (form.phone.trim()) lines.push(`Phone: ${form.phone.trim()}`);
  lines.push("");
  lines.push("Message:");
  lines.push(form.message.trim());
  lines.push("");
  lines.push("Source: Welta website contact form");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear the field-level error as soon as the user starts fixing it.
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (errors._contact && (key === "email" || key === "phone")) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next._contact;
        return next;
      });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setSubmitted(true);
    const url = buildWhatsappUrl(form);
    // Open WhatsApp in a new tab. On mobile this hands off to the
    // installed WhatsApp app; on desktop it opens web.whatsapp.com.
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={errors._contact ? "contact-form-status" : undefined}
    >
      <Field
        label="Name"
        name="name"
        value={form.name}
        onChange={(v) => update("name", v)}
        error={errors.name}
        autoComplete="name"
      />
      <Field
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={(v) => update("email", v)}
        error={errors.email}
        autoComplete="email"
      />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={(v) => update("phone", v)}
        error={errors.phone}
        autoComplete="tel"
        hint="Email or phone — at least one is required."
      />
      <Field
        label="Message"
        name="message"
        multiline
        value={form.message}
        onChange={(v) => update("message", v)}
        error={errors.message}
      />

      {/* Form-level error (when neither email nor phone is filled). */}
      {errors._contact && (
        <p
          id="contact-form-status"
          role="alert"
          className="text-xs tracking-[0.18em] uppercase text-[var(--color-gold-deep)]"
        >
          {errors._contact}
        </p>
      )}

      <button
        type="submit"
        className="inline-flex items-center justify-center px-7 py-3 min-h-[44px] bg-[var(--color-navy)] text-[var(--color-ivory)] text-xs tracking-[0.22em] uppercase hover:bg-[var(--color-navy-ink)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
      >
        Send via WhatsApp
      </button>

      <p className="text-[11px] text-[var(--color-muted)] leading-relaxed max-w-md">
        Tapping &ldquo;Send via WhatsApp&rdquo; opens WhatsApp with your
        message ready to send. The atelier team replies within one business
        day.
      </p>

      {/* aria-live region — announces the success state to screen
          readers after the WhatsApp tab opens. Visible text appears
          only after submit so the page stays calm by default. */}
      <p
        role="status"
        aria-live="polite"
        className={`text-xs tracking-[0.18em] uppercase ${
          submitted ? "text-[var(--color-gold-deep)]" : "sr-only"
        }`}
      >
        {submitted ? "WhatsApp opened in a new tab." : ""}
      </p>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (next: string) => void;
  type?: string;
  multiline?: boolean;
  error?: string;
  hint?: string;
  autoComplete?: string;
};

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  multiline = false,
  error,
  hint,
  autoComplete,
}: FieldProps) {
  const inputId = `contact-${name}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;
  const borderCls = error
    ? "border-[var(--color-gold-deep)]"
    : "border-[var(--color-line)] focus:border-[var(--color-navy)]";

  return (
    <div>
      <label htmlFor={inputId} className="block">
        <span className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)] mb-2 block">
          {label}
        </span>
        {multiline ? (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={5}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={`w-full px-4 py-3 bg-[var(--color-ivory-soft)] border ${borderCls} focus:outline-none text-sm`}
          />
        ) : (
          <input
            id={inputId}
            type={type}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete={autoComplete}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={`w-full px-4 py-3 bg-[var(--color-ivory-soft)] border ${borderCls} focus:outline-none text-sm`}
          />
        )}
      </label>
      {hint && !error && (
        <p
          id={hintId}
          className="mt-1 text-[11px] text-[var(--color-muted)]"
        >
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1 text-[11px] tracking-[0.18em] uppercase text-[var(--color-gold-deep)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
