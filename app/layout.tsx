import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LandIt AI – Land More Interviews Faster",
  description:
    "Paste your resume + any job description. Get an ATS-optimized resume, custom cover letter, LinkedIn rewrite, match score, and interview prep in seconds.",
  openGraph: {
    title: "LandIt AI – Land More Interviews Faster",
    description:
      "AI that turns your resume + job description into interview-ready materials. Never invents experience.",
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
