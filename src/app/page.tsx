import { ClerkProvider } from "@clerk/nextjs";
import Nav from "~/components/layout/Nav";
import MainGrid from "./_components/MainGrid";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  return (
    <ClerkProvider>
      <main className="flex min-h-screen min-w-[320px] flex-col items-center justify-start">
        <Nav />
        <MainGrid />
      </main>
    </ClerkProvider>
  );
}
