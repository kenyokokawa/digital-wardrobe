import { MainGridProvider } from "~/contexts/MainGridContext";
import MainGrid from "./_components/MainGrid";
import Toolbar from "~/components/toolbar/Toolbar";
import { getDemoClothingItems } from "~/server/queries";
import { getUserClothingItems } from "~/server/queries";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const user = await auth();

  let items: any[] = [];
  if (user.userId) {
    items = await getUserClothingItems();
  } else {
    items = await getDemoClothingItems(1);
  }
  return (
    <MainGridProvider>
      <Toolbar />
      <MainGrid items={items} />
    </MainGridProvider>
  );
}
