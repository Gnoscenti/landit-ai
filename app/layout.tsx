import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LandIt AI — ATS-ready resume, cover letter & interview prep",
  description:
    "Paste your resume and a job description. Get an ATS match score, tailored resume, cover letter, LinkedIn rewrite, and interview prep in seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-bg text-fg">{children}</body>
    </html>
  );
}
