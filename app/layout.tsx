import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DKE - NU",
    template: "%s | DKE - NU",
  },
  description:
    "Official website of Delta Kappa Epsilon at Northeastern University - Brotherhood, Leadership, Excellence",
  keywords: ["fraternity", "brotherhood", "university", "rush", "greek life"],
  authors: [{ name: "Delta Kappa Epsilon at Northeastern University" }],
  openGraph: {
    title: "DKE - NU",
    description:
      "Official website of Delta Kappa Epsilon at Northeastern University",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DKE - NU",
    description:
      "Official website of Delta Kappa Epsilon at Northeastern University",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white`}>
        <Header />
        <main className="relative z-10 pt-16">{children}</main>
      </body>
    </html>
  );
}
