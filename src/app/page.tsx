import Nav from "~/components/layout/Nav";
import MainGrid from "./_components/MainGrid";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Nav />
      <MainGrid />
    </main>
  );
}
