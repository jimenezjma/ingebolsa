import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import "./globals.css";

export const metadata: Metadata = {
  title: "IngeBolsa · Maquinaria para obra",
  description:
    "Excavadoras, retrocargadoras, minicargadores, compactación y plantas eléctricas en Colombia. Ficha técnica completa y cotización por WhatsApp.",
  icons: { icon: "/logo-ingebolsa.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=TikTok+Sans:wdth,wght@75..150,300..900&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
