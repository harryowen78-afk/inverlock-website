"use client";

import { useState } from "react";

/**
 * Web3Forms access key, routing submissions to info@inverlockadvisory.com.
 *
 * Public by design: Web3Forms keys identify the destination inbox and ship in
 * the page source of every site that uses them. It is committed so the forms
 * work from any build without environment configuration; setting
 * NEXT_PUBLIC_WEB3FORMS_KEY overrides it (for example to point a preview
 * deployment at a different inbox).
 */
const DEFAULT_WEB3FORMS_KEY = "fdebbcfc-e932-458c-966c-fdf4d69a285d";

export const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || DEFAULT_WEB3FORMS_KEY;

/**
 * Additional Web3Forms access keys to copy every submission to.
 *
 * Web3Forms ties one destination inbox to each access key, and its `ccemail`
 * parameter is a paid feature — so a second recipient means a second (free)
 * access key registered to that address, and one extra POST per submission.
 *
 * To add howen@inverlockadvisory.com: create a key at web3forms.com using
 * that address and paste it here.
 */
const COPY_TO_KEYS: string[] = [
  // howen@inverlockadvisory.com
  "d30a6a8a-55fd-4f04-8f45-0037930bc8e5",
];

export const CONTACT_EMAIL = "info@inverlockadvisory.com";

/** Pragmatic well-formedness check — the real test is delivery. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export type FormState = "idle" | "submitting" | "success" | "error";

interface SubmitOptions {
  /** Distinguishes the three capture points in the notification email. */
  subject: string;
  fields: Record<string, string>;
}

export function useWeb3Form() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit({ subject, fields }: SubmitOptions): Promise<boolean> {
    setState("submitting");
    setError(null);

    const post = (accessKey: string) =>
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          from_name: "Inverlock Insights",
          ...fields,
        }),
      });

    // Copies are fire-and-forget: a failed copy must never block the visitor's
    // download or show them an error, since the primary send is what counts.
    for (const key of COPY_TO_KEYS) {
      post(key).catch(() => {});
    }

    try {
      const res = await post(WEB3FORMS_KEY);

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setState("success");
        return true;
      }

      setState("error");
      setError(
        data?.message ?? "Something went wrong. Please try again, or email us directly."
      );
      return false;
    } catch {
      setState("error");
      setError(
        "We could not reach the server. Please check your connection, or email us directly."
      );
      return false;
    }
  }

  return { state, error, submit };
}
