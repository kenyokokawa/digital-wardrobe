import { type Dispatch, type SetStateAction } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { ButtonGroup } from "~/components/shared/ButtonGroup";
import OneIcon from "~/components/icons/OneIcon";
import TwoIcon from "~/components/icons/TwoIcon";
import ThreeIcon from "~/components/icons/ThreeIcon";
import SIcon from "~/components/icons/SIcon";
import MIcon from "~/components/icons/MIcon";
import LIcon from "~/components/icons/LIcon";
import VerticalIcon from "~/components/icons/VerticalIcon";
import HorizontalIcon from "~/components/icons/HorizontalIcon";

const COLUMN_OPTIONS = [
  { value: 1, icon: OneIcon },
  { value: 2, icon: TwoIcon },
  { value: 3, icon: ThreeIcon },
] as const;

const TEXT_SIZE_OPTIONS = [
  { value: "sm" as const, icon: SIcon },
  { value: "base" as const, icon: MIcon },
  { value: "lg" as const, icon: LIcon },
] as const;

const TOGGLE_OPTIONS = [
  { id: "show-name", label: "Show Name", key: "showName" as const },
  { id: "show-brand", label: "Show Brand", key: "showBrand" as const },
] as const;

const LAYOUT_OPTIONS = [
  { value: "vertical" as const, icon: VerticalIcon },
  { value: "horizontal" as const, icon: HorizontalIcon },
] as const;

export type FitCheckSettings = {
  columns: (typeof COLUMN_OPTIONS)[number]["value"];
  fontSize: (typeof TEXT_SIZE_OPTIONS)[number]["value"];
  showName: boolean;
  showBrand: boolean;
  layout: (typeof LAYOUT_OPTIONS)[number]["value"];
};

type Props = {
  settings: FitCheckSettings;
  setSettings: Dispatch<SetStateAction<FitCheckSettings>>;
};

const FitCheckControls = ({ settings, setSettings }: Props) => {
  return (
    <div className="flex flex-wrap items-end gap-6 border border-zinc-200 px-4 py-2">
      <ButtonGroup
        options={COLUMN_OPTIONS}
        value={settings.columns}
        onChange={(value) =>
          setSettings((prev) => ({ ...prev, columns: value }))
        }
        label="columns"
      />

      <ButtonGroup
        options={LAYOUT_OPTIONS}
        value={settings.layout}
        onChange={(value) =>
          setSettings((prev) => ({ ...prev, layout: value }))
        }
        label="text pos."
      />

      <ButtonGroup
        options={TEXT_SIZE_OPTIONS}
        value={settings.fontSize}
        onChange={(value) =>
          setSettings((prev) => ({ ...prev, fontSize: value }))
        }
        label="text size"
      />

      <div className="flex flex-col gap-2">
        {TOGGLE_OPTIONS.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <Checkbox
              id={option.id}
              checked={settings[option.key]}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  [option.key]: Boolean(checked),
                }))
              }
              className="h-4 w-4"
            />
            <label
              htmlFor={option.id}
              className="select-none text-xs font-medium"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitCheckControls;
