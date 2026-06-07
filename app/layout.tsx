import type { Metadata } from "next";
import { Libre_Caslon_Text, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const libreCaslonText = Libre_Caslon_Text({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-headline",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Ammamma's Pickle Shop | Authentic Kerala Pickles",
  description: "Experience the authentic taste of Kerala with Ammamma's homemade pickles. Made with love and traditional recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${libreCaslonText.variable} ${plusJakartaSans.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
