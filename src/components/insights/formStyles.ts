/**
 * Shared form styling, so the three Insights forms stay identical to each
 * other and consistent with the site's existing controls.
 */

export const inputClass =
  "w-full border border-slate-300 bg-white px-4 py-3 text-[15px] font-light text-text-dark placeholder:text-text-body/50 transition-colors duration-200 focus:border-accent-blue focus:outline-none";

export const labelClass =
  "block text-xs tracking-widest uppercase text-text-body mb-2";

/** Solid primary button, matching the disclaimer modal's accept button. */
export const submitClass =
  "inline-flex items-center justify-center gap-2 bg-navy-dark text-white px-8 py-3 text-sm font-normal tracking-wide cursor-pointer transition-colors duration-200 hover:bg-navy-primary disabled:cursor-not-allowed disabled:opacity-60";

export const inlineLinkClass =
  "text-accent-blue underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200";
