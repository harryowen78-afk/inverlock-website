import Link from "next/link";

export default function ContactBar() {
  return (
    <section className="bg-navy-primary py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-20 text-center">
        <h2 className="text-white text-3xl md:text-4xl font-normal mb-4">
          Get in touch
        </h2>
        <p className="text-white/70 text-base md:text-lg font-light mb-8 max-w-2xl mx-auto">
          To discuss how Inverlock can support your portfolio, please contact us.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border border-white text-white px-8 py-3 text-sm font-light tracking-wide cursor-pointer hover:bg-white hover:text-navy-primary transition-colors duration-200"
        >
          Contact Us
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
