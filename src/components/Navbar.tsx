"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showSolid = scrolled || !isHome;

  const handleAboutClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-20 flex items-center justify-between h-20">
        <Link href="/">
          <Image
            src="/images/inverlock-logo.svg"
            alt="Inverlock"
            width={160}
            height={40}
            className={`h-8 w-auto transition-all duration-300 ${
              showSolid ? "" : "brightness-0 invert"
            }`}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#about"
            onClick={handleAboutClick}
            className={`text-[15px] font-light tracking-wide transition-colors duration-200 ${
              showSolid
                ? "text-text-body hover:text-text-dark"
                : "text-white/90 hover:text-white"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`text-[15px] font-light tracking-wide transition-colors duration-200 ${
              showSolid
                ? "text-text-body hover:text-text-dark"
                : "text-white/90 hover:text-white"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              showSolid ? "bg-text-dark" : "bg-white"
            } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              showSolid ? "bg-text-dark" : "bg-white"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              showSolid ? "bg-text-dark" : "bg-white"
            } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link
              href="/#about"
              onClick={handleAboutClick}
              className="text-text-body hover:text-text-dark text-[15px] font-light tracking-wide"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-text-body hover:text-text-dark text-[15px] font-light tracking-wide"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
