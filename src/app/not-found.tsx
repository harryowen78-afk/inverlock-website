import type { Metadata } from "next";
import Link from "next/link";

// Without this the 404 inherits the homepage title and its canonical URL,
// telling search engines the error page *is* the homepage.
export const metadata: Metadata = {
  title: "Page Not Found | Inverlock Advisory",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: true },
  alternates: {},
};

export default function NotFound() {
  return (
    <>
      <section className="bg-navy-dark py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <h1 className="text-white text-4xl md:text-5xl font-normal">
            Page Not Found
          </h1>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <div className="max-w-2xl space-y-6">
            <p className="text-text-body text-base font-light leading-relaxed">
              The page you are looking for does not exist or has been moved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-navy-dark text-navy-dark px-8 py-3 text-sm font-light tracking-wide hover:bg-navy-dark hover:text-white transition-colors duration-200"
              >
                Return Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-accent-blue text-sm font-light tracking-wide underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
