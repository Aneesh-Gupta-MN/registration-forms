import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Register — Student Registration Portal",
  description: "A secure student registration and records management portal.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
