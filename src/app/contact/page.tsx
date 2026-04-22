import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact | Inverlock Advisory",
  description:
    "Get in touch with Inverlock to discuss infrastructure advisory, portfolio interventions, and partnership support.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Header banner */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden bg-navy-dark">
        <Image
          src="/images/substation.webp"
          alt="Electrical substation representing infrastructure assets"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoQAAkAAUAmJYgCdAEOwO7v9AAA/u0RYk5vgZ+1OZBgF/0ppsEcj2Umed9j+u3ImpDFxKd+DNTjZAAA"
        />
        <div className="absolute inset-0 bg-navy-dark/70" />
        <div className="relative z-10 flex items-end h-full pb-10 md:pb-14">
          <div className="mx-auto max-w-[1280px] w-full px-6 md:px-20">
            <h1 className="text-white text-4xl md:text-5xl font-normal">
              Contact
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <div className="max-w-2xl space-y-6 text-text-body text-base font-light leading-relaxed">
            <p>
              For enquiries, contact{" "}
              <a
                href="mailto:info@inverlockadvisory.com"
                className="text-accent-blue underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200"
              >
                info@inverlockadvisory.com
              </a>
              .
            </p>
            <a
              href="https://www.linkedin.com/company/inverlock-advisory"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Inverlock on LinkedIn"
              className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue/80 transition-colors duration-200"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200">
                Follow us on LinkedIn
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
