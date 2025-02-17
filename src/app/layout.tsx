import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import LayoutWrapper from "~/components/layout/LayoutWrapper";
import Nav from "~/components/layout/Nav";

export const metadata: Metadata = {
  title: "Digital Wardrobe",
  description: "Digital Wardrobe",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Silkscreen:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="flex min-h-screen min-w-[320px] flex-col items-center justify-start overflow-x-hidden pb-24">
          <Nav />
          <LayoutWrapper>
            <main>{children}</main>
            {modal}
          </LayoutWrapper>
         
          <div id="modal-root" />
        </body>
      </html>
    </ClerkProvider>
  );
}
