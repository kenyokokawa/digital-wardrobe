import { CategorySection } from "~/consts/consts";
import { ClothingItem } from "~/consts/types";
import ItemsRow from "./ItemsRow";

const SectionRow = ({
  items,
  section,
}: {
  items: ClothingItem[];
  section: CategorySection;
}) => {
  const itemsInSection = items.filter((item) =>
    section.items?.some((categoryItem) => item.category === categoryItem.id),
  );

  return (
    <div>
      <ItemsRow label={section?.label || ""} items={itemsInSection} />
    </div>
  );
};

export default SectionRow;
