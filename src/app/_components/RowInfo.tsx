import React from "react";
import Badge from "~/components/shared/Badge";
import Tag from "~/components/shared/Tag";

const RowInfo = ({ label, length }: { label: string; length: number }) => {
  const countText =
    length === 0 ? "empty" : length === 1 ? "1 item" : `${length} items`;
  return (
    <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full">
      <div className="mx-auto flex h-fit w-full max-w-6xl justify-between px-4">
        <Tag>{label}</Tag>
        <Badge>{countText}</Badge>
      </div>
    </div>
  );
};

export default RowInfo;
