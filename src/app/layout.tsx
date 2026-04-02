import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  title: "Inverlock | Decisive Intervention in Infrastructure",
  description:
    "Inverlock advises investors and developers on high-stakes commercial interventions across infrastructure assets.",
  openGraph: {
    title: "Inverlock | Decisive Intervention in Infrastructure",
    description:
      "Inverlock advises investors and developers on high-stakes commercial interventions across infrastructure assets.",
    type: "website",
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
      <body className="min-h-full flex flex-col">
        <DisclaimerModal />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
