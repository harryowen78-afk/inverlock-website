import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Inverlock Advisory",
  description:
    "Inverlock provides independent commercial capability across investment assurance, growth discipline, strategic review, and exit recovery for energy and infrastructure assets.",
  alternates: {
    canonical: "/services",
  },
};

export default function ApproachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
