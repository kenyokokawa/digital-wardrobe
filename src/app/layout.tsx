import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import LayoutWrapper from "~/components/layout/LayoutWrapper";
import Nav from "~/components/layout/Nav";
import { MainGridProvider } from "~/contexts/MainGridContext";
import { getUserCategories } from "~/server/queries";
import Footer from "~/components/layout/Footer";

export const metadata: Metadata = {
  title: "Digital Wardrobe",
  description: "Digital Wardrobe",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const userCategories = await getUserCategories();
  return (
    <ClerkProvider>
      <MainGridProvider userCategories={userCategories}>
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
          <body className="flex min-h-screen min-w-[320px] flex-col items-center justify-start overflow-x-hidden">
            <LayoutWrapper>
              <Nav />
              <main className="w-full">{children}</main>
              {modal}

              <Footer />
            </LayoutWrapper>
            <div id="modal-root" />
          </body>
        </html>
      </MainGridProvider>
    </ClerkProvider>
  );
}
