import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM SAM - Customer Management",
  description: "Enterprise-grade CRM solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
