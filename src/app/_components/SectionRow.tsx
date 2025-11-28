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
  const itemsInSection = items
    .filter((item) =>
      section.items?.some((categoryItem) => item.category === categoryItem.id),
    )
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div>
      <ItemsRow
        label={section?.label || ""}
        items={itemsInSection}
        sectionId={section.id}
      />
    </div>
  );
};

export default SectionRow;
