import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AmbientBackground } from "@/components/AmbientBackground";
import { InfrastructureSpine } from "@/components/InfrastructureSpine";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://prakashraj.dev";
const title = "Prakash — DevOps Engineer | Cloud Infrastructure & Automation";
const description =
  "DevOps Engineer specializing in AWS, Azure, GCP, Kubernetes, Terraform, CI/CD and cloud infrastructure automation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "DevOps Engineer",
    "Cloud Engineer",
    "AWS",
    "Azure",
    "GCP",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "Infrastructure as Code",
    "Site Reliability",
  ],
  authors: [{ name: "Prakash" }],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Prakash — DevOps Engineer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-base-950 font-sans">
        <AmbientBackground />
        <InfrastructureSpine />
        {children}
      </body>
    </html>
  );
}
