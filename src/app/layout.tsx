import type { Metadata } from "next";
import { SessionProvider } from "@/providers/SessionProvider";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/providers/CartProvider";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FooterVisibility } from "@/components/FooterVisibility";
import { ToastSonner } from "@/components/ui/toast-sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ElectronicSolve Store",
  description: "ElectronicSolve loja de eletrônicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F2F3F4]">
        <Script id="remove-cz-shortcut-listen" strategy="beforeInteractive">
          {`try{document.body.removeAttribute('cz-shortcut-listen')}catch(e){}`}
        </Script>
        <QueryProvider>
          <SessionProvider>
            <CartProvider>
              <ToastSonner />
              {children}
              <FooterVisibility />
            </CartProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
