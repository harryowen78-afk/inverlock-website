import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-primary text-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-20 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <nav aria-label="Footer navigation" className="flex gap-8 text-sm text-white/70">
            <Link href="/#about" className="hover:text-white transition-colors duration-200">
              About Us
            </Link>
            <Link href="/services" className="hover:text-white transition-colors duration-200">
              Services
            </Link>
            <Link href="/insights" className="hover:text-white transition-colors duration-200">
              Insights
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors duration-200">
              Contact
            </Link>
          </nav>
          <div className="flex gap-6 text-xs text-white/70">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-200 py-2"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors duration-200 py-2"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-blue/30 pt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Sitewide disclaimer. Kept in step with the paper's own wording in
              PaperDisclaimer.tsx; only the scope differs (website vs document). */}
          <p className="text-xs text-white/70 leading-relaxed max-w-3xl">
            Inverlock is a trading name. This website is for informational
            purposes only and does not constitute advice, an offer,
            solicitation, or recommendation. It should not be relied upon for
            any purpose. No representation or warranty is made as to accuracy
            or completeness, and we disclaim all liability arising from its
            use.
          </p>
          <a
            href="https://www.linkedin.com/company/inverlock-advisory"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Inverlock on LinkedIn"
            className="text-white/70 hover:text-white transition-colors duration-200 shrink-0"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
