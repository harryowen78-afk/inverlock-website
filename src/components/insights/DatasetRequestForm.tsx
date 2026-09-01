"use client";

import { useState } from "react";
import Link from "next/link";
import ArrowRight from "./ArrowRight";
import { useWeb3Form, isValidEmail, CONTACT_EMAIL } from "./useWeb3Form";
import {
  inputClass,
  labelClass,
  submitClass,
  inlineLinkClass,
} from "./formStyles";

interface Props {
  paperTitle: string;
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
}

/**
 * The enquiry form beneath the data offer. Email is the only required field,
 * matching the download modal — these are the highest-intent enquiries on the
 * site and every extra required field costs some of them.
 *
 * The copy commits to replying, never to sending: what goes out, and to whom,
 * stays a judgement made in the reply.
 */
export default function DatasetRequestForm({
  paperTitle,
  submitLabel = "Contact the team",
  messageLabel = "What would you like to discuss?",
  messagePlaceholder = "The methodology, a specific exhibit, or a platform you are looking at…",
}: Props) {
  const { state, error, submit } = useWeb3Form();
  const [touched, setTouched] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);

    const data = new FormData(e.currentTarget);
    if (data.get("botcheck")) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!isValidEmail(email)) {
      setEmailError(
        email
          ? "That does not look like a valid email address."
          : "Please enter your email address."
      );
      document.getElementById("ds-email")?.focus();
      return;
    }
    setEmailError(null);

    await submit({
      subject: `Dataset request — ${paperTitle}`,
      fields: {
        name: name || "(not provided)",
        email,
        message: message || "(no message)",
        paper: paperTitle,
        source: "dataset-request",
      },
    });
  }

  if (state === "success") {
    return (
      <div className="max-w-xl" role="status">
        <p className="text-text-body text-base font-light leading-relaxed">
          Thank you. Your message has reached us and we will follow up directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl">
      <div>
        <label htmlFor="ds-email" className={labelClass}>
          Email
        </label>
        <input
          id="ds-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? "ds-email-error" : undefined}
          onChange={() => emailError && setEmailError(null)}
          placeholder="you@company.com"
          className={`${inputClass} ${emailError ? "border-[#a4342c]" : ""}`}
        />
        {emailError && (
          <p id="ds-email-error" className="mt-2 text-sm font-light text-[#a4342c]">
            {emailError}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="ds-name" className={labelClass}>
          Name <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="ds-name"
          name="name"
          type="text"
          autoComplete="name"
          className={inputClass}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="ds-message" className={labelClass}>
          {messageLabel}{" "}
          <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          id="ds-message"
          name="message"
          rows={3}
          className={`${inputClass} resize-y`}
          placeholder={messagePlaceholder}
        />
      </div>

      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="mt-6">
        <button
          type="submit"
          disabled={state === "submitting"}
          className={submitClass}
        >
          {state === "submitting" ? "Sending…" : submitLabel}
          {state !== "submitting" && <ArrowRight />}
        </button>
      </div>

      <div aria-live="polite" className="mt-4 min-h-[1.25rem]">
        {touched && state === "error" && (
          <p className="text-sm font-light text-[#a4342c]">
            {error}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={inlineLinkClass}>
              Email us instead
            </a>
            .
          </p>
        )}
      </div>

      <p className="mt-4 text-xs text-text-body/70 font-light leading-relaxed">
        We use your details only to respond to your message.{" "}
        <Link href="/privacy" className={inlineLinkClass}>
          Privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
