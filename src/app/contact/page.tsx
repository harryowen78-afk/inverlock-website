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
                href="mailto:jhenry@inverlockadvisory.com"
                className="text-accent-blue underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200"
              >
                jhenry@inverlockadvisory.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
