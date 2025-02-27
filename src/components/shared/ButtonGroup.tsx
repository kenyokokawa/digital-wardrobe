import React from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export type ButtonGroupOption<T> = {
  value: T;
  icon: React.ElementType;
  label?: string;
  tooltip?: string;
};

type ButtonGroupProps<T> = {
  options: readonly ButtonGroupOption<T>[] | ButtonGroupOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  iconSize?: number;
  disabled?: boolean;
};

export function ButtonGroup<T extends React.Key>({
  options,
  value,
  onChange,
  label,
  disabled = false,
}: ButtonGroupProps<T>) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-xs font-medium text-zinc-500">{label}</span>
      )}
      <div className="flex gap-1">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;

          const buttonElement = (
            <Button
              key={`button-${String(option.value)}`}
              size={"sm"}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onChange(option.value)}
              className="h-7 w-7 p-0"
              disabled={disabled}
            >
              <Icon
                color={isSelected ? "white" : disabled ? "gray" : "black"}
              />
            </Button>
          );

          return option.tooltip ? (
            <Tooltip key={option.value as React.Key}>
              <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
              <TooltipContent>
                <p>{option.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <React.Fragment key={option.value as React.Key}>
              {buttonElement}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
