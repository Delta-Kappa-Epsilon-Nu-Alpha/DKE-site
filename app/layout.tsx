import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

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
      <body className="min-h-screen">
        <Header />
        <main className="relative z-10 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
