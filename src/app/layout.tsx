import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Control361 Vehicle Test",
  description: "Vehicle management test project for Control361",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
