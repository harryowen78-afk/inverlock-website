import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DisclaimerModal from "@/components/DisclaimerModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.inverlockadvisory.com"),
  title: "Inverlock | Decisive Intervention in Infrastructure",
  description:
    "Inverlock advises investors and developers on high-stakes commercial interventions across infrastructure assets.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Inverlock | Decisive Intervention in Infrastructure",
    description:
      "Inverlock advises investors and developers on high-stakes commercial interventions across infrastructure assets.",
    type: "website",
    url: "/",
    siteName: "Inverlock Advisory",
    locale: "en_GB",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Inverlock — Decisive Intervention in Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inverlock | Decisive Intervention in Infrastructure",
    description:
      "Inverlock advises investors and developers on high-stakes commercial interventions across infrastructure assets.",
    images: ["/images/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Inverlock",
              url: "https://www.inverlockadvisory.com",
              description:
                "Specialist infrastructure advisory firm delivering high-stakes commercial interventions across portfolio companies and mega projects.",
              email: "info@inverlockadvisory.com",
              logo: "https://www.inverlockadvisory.com/images/inverlock-logo.svg",
              sameAs: ["https://www.linkedin.com/company/inverlock-advisory"],
              serviceType: "Infrastructure Advisory",
              areaServed: "Global",
              knowsAbout: [
                "Infrastructure Investment",
                "Portfolio Management",
                "Energy Infrastructure",
                "Offshore Wind",
                "M&A Advisory",
                "Joint Ventures",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-navy-dark focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        <DisclaimerModal />
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        {/* Cookieless, so no consent banner is required. Enable Web Analytics
            on the Vercel project for the dashboard to receive these events. */}
        <Analytics />
      </body>
    </html>
  );
}
