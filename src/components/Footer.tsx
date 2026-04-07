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
            <Link href="/contact" className="hover:text-white transition-colors duration-200">
              Contact
            </Link>
          </nav>
          <div className="flex gap-6 text-xs text-white/70">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-blue/30 pt-6">
          <p className="text-xs text-white/70 leading-relaxed max-w-3xl">
            Inverlock is a trading name. This website is intended for
            informational purposes only and does not constitute an offer or
            solicitation. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
