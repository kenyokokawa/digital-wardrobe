import Toolbar from "~/components/toolbar/Toolbar";
import { getUserClothingItems } from "~/server/queries";
import MainGrid from "./_components/MainGrid";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const items = await getUserClothingItems();
  return (
    <>

      <Toolbar />
      <MainGrid items={items} />
    </>
  );
}
